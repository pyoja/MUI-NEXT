"use client";

import React from "react";
import SignupForm from "../../components/SignupForm";

export default function SignupPage() {
  const handleSignupSuccess = () => {
    console.log("Signup successful!");
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm onSignupSuccess={handleSignupSuccess} />
    </div>
  );
}
