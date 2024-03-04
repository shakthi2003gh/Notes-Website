import { MdOutlineWbSunny } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";
import { useTheme } from "../state/theme";
import Toggle from "../components/toggle";

export default function ThemeToggle() {
  const { isDarkTheme, themeToggle } = useTheme();

  return (
    <div className="theme-toggle">
      {isDarkTheme ? <PiMoonFill /> : <MdOutlineWbSunny />}

      <Toggle ON={isDarkTheme} onToggle={themeToggle} />
    </div>
  );
}
