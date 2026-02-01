//@/components/auth/PaymentDetailsForm.jsx

"use client"; 

import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FiDownload } from "react-icons/fi";

const theme = {
  eerieBlack: "#1C2127",
  berkeleyBlue: "#0B385F",
  uclaBlue: "#3373B0",
  columbiaBlue: "#BED4E9",
  aliceBlue: "#E7F1FB",
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.aliceBlue};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const FormTitle = styled.h2`
  color: ${(props) => props.theme.berkeleyBlue};
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid ${(props) => props.theme.columbiaBlue};
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  color: ${(props) => props.theme.eerieBlack};
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.uclaBlue};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid ${(props) => props.theme.columbiaBlue};
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  color: ${(props) => props.theme.eerieBlack};
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.uclaBlue};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.uclaBlue};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.berkeleyBlue};
  }
`;

const PaymentDetailsForm = ({ email, selectedDepartment, onSuccess, setError }) => {
  const [formData, setFormData] = useState({
    transactionNumber: "",
    transactionScreenshot: null,
    department: selectedDepartment || "", // Pre-fill if available
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures hydration happens only on the client
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, transactionScreenshot: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("transactionNumber", formData.transactionNumber);
    formDataToSend.append("transactionScreenshot", formData.transactionScreenshot);
    formDataToSend.append("selectedDepartment", formData.department);
    formDataToSend.append("email", email);

    try {
      const res = await fetch("/api/auth/complete-registration", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });
      if (res.status === 200) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "Payment submission failed");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      setError("Payment submission failed");
    }
  };

  // Prevent rendering until it's on the client to avoid SSR mismatch
  if (!isClient) return null;

  return (
    <ThemeProvider theme={theme}>
      <FormContainer suppressHydrationWarning>
        <a
          href="https://clement2004.blob.core.windows.net/techutsav25/Payment_process2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: theme.berkeleyBlue, marginBottom: "1rem" }}
        >
          <FiDownload size={24} /> Download Payment Instructions
        </a>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormTitle>Complete Registration – Payment Details</FormTitle>

          {/* Department Dropdown */}
          <Select name="department" value={formData.department} onChange={handleChange} required>
            <option value="" disabled>
              Confirm your preferred department
            </option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="CSBS">CSBS</option>
            <option value="DS">DS</option>
          </Select>

          {/* Transaction Number Input */}
          <Input
            name="transactionNumber"
            type="text"
            placeholder="Transaction Number"
            onChange={handleChange}
            required
          />

          {/* File Upload Input */}
          <Input type="file" accept="image/*" onChange={handleFileChange} required />

          {/* Submit Button */}
          <Button type="submit">Submit Payment Details</Button>
        </form>
      </FormContainer>
    </ThemeProvider>
  );
};

export default PaymentDetailsForm;
