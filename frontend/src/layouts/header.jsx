import Auth from "./Auth";
import { useNetwork } from "../state/network";
import { useUser } from "../state/user";
import { useTheme } from "../state/theme";
import { usePopup } from "./popup";
import LogoLight from "../assets/logo-light.svg";
import LogoDark from "../assets/logo-dark.svg";
import UserAvatar from "../components/userAvatar";
import ThemeToggle from "../components/themeToggle";
import { SyncButton } from "../components/button";

export default function Header() {
  const { user } = useUser();
  const { isDarkTheme } = useTheme();

  return (
    <header>
      <div className="container">
        <img className="logo" src={isDarkTheme ? LogoLight : LogoDark} alt="" />

        {user ? <LogedInLayout /> : <LogedOutLayout />}
      </div>
    </header>
  );
}

function LogedInLayout() {
  return (
    <>
      <SyncButton />

      <UserAvatar />
    </>
  );
}

function LogedOutLayout() {
  const { isOffline } = useNetwork();
  const { display } = usePopup();

  const handleClick = () => {
    display(<Auth />);
  };

  return (
    <>
      <ThemeToggle />

      <button
        className="btn btn--primary"
        disabled={isOffline}
        onClick={handleClick}
      >
        Login
      </button>
    </>
  );
}
