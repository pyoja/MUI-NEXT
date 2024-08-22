"use client";

import React from "react";
import SignupForm from "../../components/SignupForm";

export default function SignupPage() {
  const handleSignupSuccess = () => {
    // 회원가입 성공 시 수행할 작업
    console.log("Signup successful!");
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm onSignupSuccess={handleSignupSuccess} />
    </div>
  );
}
