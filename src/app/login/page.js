"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SnackbarComponent } from "@/components/SnackbarComponent";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  eerieBlack: "#1C2127",
  berkeleyBlue: "#0B385F",
  uclaBlue: "#3373B0",
  columbiaBlue: "#BED4E9",
  aliceBlue: "#E7F1FB",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.aliceBlue};
  padding: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
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

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.berkeleyBlue};
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageBack, setMessageBack] = useState("green");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Complete all details");
      setMessageBack("red");
      setOpen(true);
      return;
    }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      setMessage("Login successful!");
      setMessageBack("green");
      setOpen(true);
      router.push("/");
    } catch (err) {
      setMessage("Invalid credentials");
      setMessageBack("red");
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
          <StyledLink href="/signup">Don't have an account? Register here</StyledLink>
        </Form>
        <SnackbarComponent open={open} message={message} messageBack={messageBack} setOpen={setOpen} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;