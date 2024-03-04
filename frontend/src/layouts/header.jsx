import { useTheme } from "../state/theme";
import LogoLight from "../assets/logo-light.svg";
import LogoDark from "../assets/logo-dark.svg";
import ThemeToggle from "../components/themeToggle";

export default function Header() {
  const { isDarkTheme } = useTheme();

  return (
    <header>
      <div className="container">
        <img className="logo" src={isDarkTheme ? LogoLight : LogoDark} alt="" />

        <ThemeToggle />

        <button className="btn btn--primary">Login</button>
      </div>
    </header>
  );
}
