// models/User.ts
import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
  {
    name: { type: String, required: "Name Required" },
    email: {
      type: String,
      required: "Email Required",
      unique: true,
      lowercase: true,
    },

    password: { type: String, required: "Password Required" },

    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    passwordResetToken: String,
    passwordResetExpires: Date,

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },

    phoneNo: String,
    year: Number,
    department: String,

    onboardingCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.User ||
  mongoose.model("User", userSchema)
