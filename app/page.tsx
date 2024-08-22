"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}
