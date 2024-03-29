import { useState } from "react";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

export default function Auth() {
  const [method, setMethod] = useState("login");

  const showLogin = () => {
    setMethod("login");
  };

  const showSignUp = () => {
    setMethod("signup");
  };

  return (
    <div className="auth">
      {method === "login" ? (
        <LoginForm onNavigate={showSignUp} />
      ) : (
        <SignupForm onNavigate={showLogin} />
      )}
    </div>
  );
}
