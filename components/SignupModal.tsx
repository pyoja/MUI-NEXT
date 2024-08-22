import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import SignupForm from "./SignupForm";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignupModal({ open, onClose }: SignupModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <SignupForm onSignupSuccess={onClose} />
      </Box>
    </Modal>
  );
}
