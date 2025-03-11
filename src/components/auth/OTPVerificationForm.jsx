"use client";

import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

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
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Message = styled.p`
  color: ${(props) => props.theme.eerieBlack};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid ${(props) => props.theme.columbiaBlue};
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  color: ${(props) => props.theme.eerieBlack};
  transition: border-color 0.3s;

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

const OTPVerificationForm = ({ email, onSuccess, setError }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (res.status === 200) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "OTP Verification failed");
      }
    } catch (error) {
      console.error("OTP Verification error:", error);
      setError("OTP Verification failed");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormTitle>Verify Your Email</FormTitle>
          <Message>Please enter the OTP sent to {email}</Message>
          <StyledInput
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button type="submit">Verify Email</Button>
        </form>
      </FormContainer>
    </ThemeProvider>
  );
};

export default OTPVerificationForm;
