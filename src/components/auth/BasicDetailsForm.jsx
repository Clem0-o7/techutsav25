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

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid ${(props) => props.theme.columbiaBlue};
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  color: ${(props) => props.theme.eerieBlack};
  transition: border-color 0.3s;
  cursor: pointer;

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

const BasicDetailsForm = ({ onSuccess, setError }) => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    collegeName: "",
    department: "",
    password: "",
    selectedDepartment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        onSuccess(formData.email, formData.selectedDepartment);
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormTitle>Techutsav '25 Register</FormTitle>
          <StyledInput name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <StyledInput name="fullName" type="text" placeholder="Full Name" onChange={handleChange} required />
          <StyledInput name="phoneNumber" type="text" placeholder="Phone Number" onChange={handleChange} required />
          <StyledInput name="collegeName" type="text" placeholder="College Name" onChange={handleChange} required />
          <StyledInput name="department" type="text" placeholder="Department" onChange={handleChange} required />
          <StyledInput name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <StyledSelect name="selectedDepartment" onChange={handleChange} required defaultValue="">
            <option value="" disabled>Select Preferred Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="CSBS">CSBS</option>
            <option value="DS">DS</option>
          </StyledSelect>
          <Button type="submit">Register</Button>
        </form>
      </FormContainer>
    </ThemeProvider>
  );
};

export default BasicDetailsForm;
