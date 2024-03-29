import { useId, useRef } from "react";
import { usePopup } from "../popup";
import { useUser } from "../../state/user";
import InputGroup from "../../components/inputGroup";
import Button from "../../components/button";

export default function LoginForm({ onNavigate }) {
  const emailRef = useRef("");
  const passwordRef = useRef();
  const { login, isLoading } = useUser();
  const { close } = usePopup();

  const inputs = [
    {
      id: useId(),
      ref: emailRef,
      type: "email",
      label: "email",
      placeholder: "email@domain.com",
      autoFocus: true,
    },
    {
      id: useId(),
      ref: passwordRef,
      type: "password",
      label: "password",
      placeholder: "•••••••",
    },
  ];

  const handleSumbit = (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(payload).then(() => close());
  };

  return (
    <form className="login" onSubmit={handleSumbit}>
      <h1>Login</h1>

      {inputs.map(({ id, ...input }) => (
        <InputGroup key={id} {...input} />
      ))}

      <Button className="btn btn--primary" loading={isLoading}>
        Login
      </Button>

      <p>
        Don't have an account{" "}
        <button type="button" onClick={onNavigate}>
          sign up
        </button>
      </p>
    </form>
  );
}
