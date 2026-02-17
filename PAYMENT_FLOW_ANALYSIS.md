# Payment Flow Analysis - Multi-Pass System

## 📋 Complete Flow Walkthrough

### 1. **User Views Profile Page**
- User lands on `/profile` page
- `ProfilePage` fetches user data via `/api/profile/getProfile`
- Response includes `passes` array with all previous purchases

### 2. **Pass Selection**
**File:** `src/components/Profile/PaymentSection.jsx`

```javascript
// For each pass type (1, 2, 3, 4)
getPurchasedPass(passType) → checks if user.passes contains this passType
```

**Pass States:**
- **Not Purchased** → Shows "Buy Pass" button
- **Pending** → Shows "Pending Verification" badge (yellow)
- **Verified** → Shows "✓ Verified" badge (green) - Cannot repurchase
- **Rejected** → Shows "Rejected" badge (red) + "Resubmit Payment" button

### 3. **User Clicks "Buy Pass" or "Resubmit Payment"**
**Flow:**
```
PassCard → onBuyClick(passType) 
         → PaymentSection.handleBuyClick(passType)
         → setSelectedPass(passType)
         → PaymentModal opens
```

### 4. **Payment Modal Submission**
**File:** `src/components/Profile/PaymentModal.jsx`

User fills:
- Transaction ID (text input)
- Screenshot (file upload)

On Submit:
```javascript
FormData created with:
  - passType: 1/2/3/4
  - transactionId: "ABC123..."
  - screenshot: File object
```

### 5. **API Processing**
**File:** `src/app/api/profile/submit-payment/route.js`

#### Step-by-Step:
1. **Authentication** - Verify JWT token from cookie
2. **Validation:**
   - passType must be 1, 2, 3, or 4
   - transactionId required
   - screenshot file required
3. **Check Existing Pass:**
   ```javascript
   existingPass = user.passes.find(p => p.passType === passType)
   if (existingPass.status === "verified") → REJECT (already verified)
   ```

4. **Azure Blob Upload:**
   ```javascript
   Blob Name Pattern:
   payment-screenshots/{userId}-pass{passType}-{timestamp}-{originalFileName}
   
   Examples:
   - payment-screenshots/65abc123-pass1-1739890123456-receipt.jpg
   - payment-screenshots/65abc123-pass2-1739890234567-payment.png
   - payment-screenshots/65abc123-pass1-1739890345678-updated.jpg  // Resubmission
   ```

5. **Database Update:**
   - **If Resubmission (existingPass exists):**
     ```javascript
     existingPass.transactionNumber = newTransactionId
     existingPass.transactionScreenshot = newBlobUrl  // New blob with new timestamp
     existingPass.status = "pending"
     existingPass.rejectionReason = undefined
     existingPass.submittedDate = new Date()
     ```
   
   - **If First Purchase:**
     ```javascript
     user.passes.push({
       passType,
       transactionNumber,
       transactionScreenshot: blobUrl,
       status: "pending",
       submittedDate: new Date()
     })
     ```

6. **Save & Respond:**
   ```javascript
   user.save() → MongoDB update
   Response: { success: true, message: "..." }
   ```

### 6. **UI Update After Submission**
```javascript
ProfilePage.handlePaymentSubmit() 
  → API call
  → showSnackbar("Payment details submitted successfully!")
  → fetchProfile() // Refresh user data
  → PassCard updates to show "Pending Verification" badge
```

## 🗂️ Azure Blob Storage Structure

### Naming Convention:
```
Container: techutsav25
Path: payment-screenshots/

Files:
├── {userId}-pass1-{timestamp1}-{filename1}  // Pass 1 first attempt
├── {userId}-pass1-{timestamp2}-{filename2}  // Pass 1 resubmission
├── {userId}-pass2-{timestamp3}-{filename3}  // Pass 2 first attempt
├── {userId}-pass3-{timestamp4}-{filename4}  // Pass 3 first attempt
├── {userId}-pass3-{timestamp5}-{filename5}  // Pass 3 resubmission
└── {userId}-pass4-{timestamp6}-{filename6}  // Pass 4 first attempt
```

### Key Points:
- **Each resubmission creates a NEW blob** (old blob remains in storage)
- **Timestamp ensures uniqueness** - prevents overwrites
- **Pass type in filename** - easy identification by admins
- **User ID in filename** - links to user account

## 🔄 Resubmission Flow (Rejected Payment)

### Scenario: Payment rejected, user uploads wrong image

1. **Admin rejects payment:**
   ```javascript
   pass.status = "rejected"
   pass.rejectionReason = "Invalid screenshot - account number not visible"
   ```

2. **User sees rejection:**
   - PassCard shows red "Rejected" badge
   - Rejection reason displayed
   - "Resubmit Payment" button appears

3. **User clicks resubmit:**
   - Modal opens (same as initial purchase)
   - User enters new transaction ID
   - User uploads correct screenshot

4. **New Azure Blob created:**
   ```javascript
   Old blob: 65abc123-pass1-1739890123456-wrong.jpg  // Still exists in storage
   New blob: 65abc123-pass1-1739890999999-correct.jpg // New upload
   ```

5. **Database updated:**
   ```javascript
   existingPass.transactionScreenshot = "https://...blob.../65abc123-pass1-1739890999999-correct.jpg"
   existingPass.status = "pending"  // Reset to pending
   existingPass.rejectionReason = undefined  // Clear rejection reason
   ```

## 🎯 Pass Purchase Rules

### Per Pass Type:
| Pass | Individual/Team | Once Per |
|------|-----------------|----------|
| 1    | Per Head        | User     |
| 2    | Per Head        | User     |
| 3    | Per Team        | Team*    |
| 4    | Per Head        | User     |

*Note: Pass 3 team formation happens after payment verification (future feature)

### Purchase Restrictions:
```javascript
// ALLOWED:
- Buy Pass 1 (first time) → ✅
- Buy Pass 2 (first time) → ✅
- Resubmit Pass 1 (after rejection) → ✅
- Buy all 4 passes → ✅

// NOT ALLOWED:
- Buy Pass 1 twice (if already verified) → ❌ Error: "This pass has already been verified"
- Resubmit verified pass → ❌ (No resubmit button shown)
- Skip screenshot upload → ❌ Error: "Screenshot is required"
```

## 📊 Database Schema

### User Model - Passes Array:
```javascript
passes: [
  {
    passType: Number (1-4),
    transactionNumber: String,
    transactionScreenshot: String (Azure Blob URL),
    status: "pending" | "verified" | "rejected",
    rejectionReason: String (optional),
    submittedDate: Date,
    verifiedDate: Date (optional)
  }
]
```

### Example User Document:
```json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "passes": [
    {
      "passType": 1,
      "transactionNumber": "TXN123456",
      "transactionScreenshot": "https://clement2004.blob.core.windows.net/techutsav25/payment-screenshots/65abc123-pass1-1739890123456-receipt.jpg",
      "status": "verified",
      "submittedDate": "2026-02-15T10:30:00.000Z",
      "verifiedDate": "2026-02-16T14:20:00.000Z"
    },
    {
      "passType": 2,
      "transactionNumber": "TXN789012",
      "transactionScreenshot": "https://clement2004.blob.core.windows.net/techutsav25/payment-screenshots/65abc123-pass2-1739890234567-payment.png",
      "status": "pending",
      "submittedDate": "2026-02-17T08:15:00.000Z"
    }
  ]
}
```

## 🔍 QR Code Generation

**File:** `src/components/Profile/ProfileQRCode.jsx`

### QR Data Structure:
```javascript
{
  userId: "65abc123...",
  userName: "John Doe",
  event: "TechUtsav Paradigm '26",
  passes: [
    {
      type: 1,
      name: "Offline Workshop + All Events",
      verifiedDate: "2026-02-16T14:20:00.000Z"
    }
  ],
  timestamp: "2026-02-17T10:00:00.000Z"
}
```

### Key Points:
- **Only verified passes included** in QR code
- **QR updates automatically** when new pass verified
- **Single QR for all passes** - not separate QR per pass
- **Admin scans QR** → sees all user's verified passes

## 🐛 Edge Cases Handled

### 1. **Accidental Wrong Upload:**
- User uploads wrong image → Admin rejects
- User can resubmit with correct image
- Old blob remains in storage (for audit trail)
- New blob created with new timestamp

### 2. **Multiple Resubmissions:**
- Each resubmission creates new blob
- Filename pattern: `userId-pass{type}-{timestamp}-{filename}`
- No limit on resubmissions (until verified)

### 3. **Verified Pass Protection:**
- Cannot repurchase verified pass
- "Buy Pass" button doesn't show for verified passes
- API rejects attempts to resubmit verified pass

### 4. **Pending Pass Status:**
- Shows "Pending Verification" badge
- No Buy button (awaiting admin action)
- Informational text: "typically takes 24-36 hours"

### 5. **No Pass Purchased:**
- Shows "Buy Pass" button
- All 4 passes can be purchased independently

## 💡 Admin Verification Process (Future Reference)

When admin verifies payment:
```javascript
pass.status = "verified"
pass.verifiedDate = new Date()
pass.rejectionReason = undefined  // Clear any previous rejection
```

When admin rejects payment:
```javascript
pass.status = "rejected"
pass.rejectionReason = "Reason for rejection here"
pass.verifiedDate = undefined
```

## ✅ Validation Checks Summary

### Frontend (PaymentModal.jsx):
- Transaction ID not empty
- Screenshot file selected
- Required HTML5 validation

### Backend (submit-payment/route.js):
1. JWT authentication
2. passType is 1, 2, 3, or 4
3. transactionId exists
4. screenshot file exists
5. Pass not already verified
6. Azure Blob upload successful
7. MongoDB save successful

## 🔒 Security Considerations

1. **Authentication:** JWT token in httpOnly cookie
2. **Authorization:** User can only submit payments for their own account
3. **File Upload:** Only image/* MIME types accepted
4. **Azure Blob:** Private container, requires connection string
5. **Unique URLs:** Timestamp prevents filename collisions
6. **Audit Trail:** All blobs preserved (old uploads not deleted)
