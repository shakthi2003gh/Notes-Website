import { useId, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { usePopup } from "../popup";
import { useUser } from "../../state/user";
import InputGroup from "../../components/inputGroup";
import Button from "../../components/button";

export default function SignupForm({ onNavigate }) {
  const [isVerifyOTP, setVerifyOTP] = useState(false);
  const { register, isLoading } = useUser();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const inputs = [
    {
      id: useId(),
      ref: nameRef,
      type: "text",
      label: "name",
      placeholder: "username",
      autoFocus: true,
    },
    {
      id: useId(),
      ref: emailRef,
      type: "email",
      label: "email",
      placeholder: "email@domain.com",
    },
    {
      id: useId(),
      ref: passwordRef,
      type: "password",
      label: "password",
      placeholder: "•••••••",
    },
  ];

  const handleNavigate = () => {
    setVerifyOTP(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    emailRef.value = payload.email;
    setVerifyOTP(false);
    register(payload).then(() => setVerifyOTP(true));
  };

  if (isVerifyOTP)
    return <VerifyForm email={emailRef.value} onNavigate={handleNavigate} />;

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

      {inputs.map(({ id, ...input }) => (
        <InputGroup key={id} {...input} />
      ))}

      <Button className="btn btn--primary" loading={isLoading}>
        Register
      </Button>

      <p>
        Already have an account{" "}
        <button type="button" onClick={onNavigate}>
          login
        </button>
      </p>
    </form>
  );
}

function VerifyForm({ email, onNavigate }) {
  const [isLoading, setLoading] = useState(false);
  const OTPRef = useRef(null);
  const { verify, resend, isLoading: userLoading } = useUser();
  const { close } = usePopup();

  const label = (
    <>
      OTP sent to <b>{email}</b>. Check your inbox and enter it below.
    </>
  );

  const handleResend = () => {
    setLoading(true);
    resend(email).finally(() => setLoading(false));
    OTPRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      otp: OTPRef.current.value,
    };

    verify(payload).then(close);
  };

  return (
    <form className="verify" onSubmit={handleSubmit}>
      <button type="button" className="back" onClick={onNavigate}>
        <FaArrowLeftLong /> back
      </button>

      <InputGroup
        ref={OTPRef}
        name="otp"
        type="text"
        inputMode="numeric"
        label={label}
      />

      <Button className="btn btn--primary" loading={userLoading}>
        Verify
      </Button>

      <p>
        Need another OTP? Click{" "}
        <Button type="button" onClick={handleResend} loading={isLoading}>
          Resend OTP
        </Button>
      </p>
    </form>
  );
}
