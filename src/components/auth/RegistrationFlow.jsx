//@/components/auth/RegistrationFlow.jsx

"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import BasicDetailsForm from "./BasicDetailsForm";
import OTPVerificationForm from "./OTPVerificationForm";
import PaymentDetailsForm from "./PaymentDetailsForm";

// Styled Components
const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ $primary }) => ($primary ? "#3373B0" : "#ccc")};
  color: white;
  flex: 1;
  margin: 0 5px;
  transition: background 0.3s;

  &:hover {
    background: ${({ $primary }) => ($primary ? "#0B385F" : "#aaa")};
  }

  &:disabled {
    background: #e0e0e0;
    cursor: not-allowed;
  }
`;



// Helper function to get localStorage values safely
const getLocalStorageValue = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

const RegistrationFlow = () => {
  const [step, setStep] = useState(() => parseInt(getLocalStorageValue("registrationStep", "1"), 10));
  const [email, setEmail] = useState(() => getLocalStorageValue("registrationEmail", ""));
  const [selectedDepartment, setSelectedDepartment] = useState(() => getLocalStorageValue("registrationDepartment", ""));
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("registrationStep", step);
    localStorage.setItem("registrationEmail", email);
    localStorage.setItem("registrationDepartment", selectedDepartment);
  }, [step, email, selectedDepartment]);

  const handleBasicSuccess = (registeredEmail, prefDepartment) => {
    setEmail(registeredEmail);
    setSelectedDepartment(prefDepartment);
    setError("");
    setStep(2);
  };

  const handleOtpSuccess = () => {
    setError("");
    setStep(3);
  };

  const handlePaymentSuccess = () => {
    localStorage.clear();
    window.location.href = "/login"; // Redirect after successful registration
  };

  return (
    <Container>
      {error && <ErrorText>{error}</ErrorText>}

      {step === 1 && <BasicDetailsForm onSuccess={handleBasicSuccess} setError={setError} />}
      {step === 2 && <OTPVerificationForm email={email} onSuccess={handleOtpSuccess} setError={setError} />}
      {step === 3 && <PaymentDetailsForm email={email} selectedDepartment={selectedDepartment} onSuccess={handlePaymentSuccess} setError={setError} />}

      <ButtonGroup>
        <Button onClick={() => setStep(step - 1)} disabled={step === 1}>Back</Button>
        <Button onClick={() => setStep(step + 1)} disabled={step === 3} $primary>Next</Button>

      </ButtonGroup>
    </Container>
  );
};

export default RegistrationFlow;
