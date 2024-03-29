import Auth from "./Auth";
import { useNetwork } from "../state/network";
import { useTheme } from "../state/theme";
import { usePopup } from "./popup";
import LogoLight from "../assets/logo-light.svg";
import LogoDark from "../assets/logo-dark.svg";
import ThemeToggle from "../components/themeToggle";

export default function Header() {
  const { display } = usePopup();
  const { isOffline } = useNetwork();
  const { isDarkTheme } = useTheme();

  const handleClick = () => {
    display(<Auth />);
  };

  return (
    <header>
      <div className="container">
        <img className="logo" src={isDarkTheme ? LogoLight : LogoDark} alt="" />

        <ThemeToggle />

        <button
          className="btn btn--primary"
          disabled={isOffline}
          onClick={handleClick}
        >
          Login
        </button>
      </div>
    </header>
  );
}
