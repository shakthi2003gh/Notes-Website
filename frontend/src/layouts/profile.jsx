import { MdOutlineLogout } from "react-icons/md";
import { useUser } from "../state/user";
import { useTheme } from "../state/theme";
import { usePopup } from "./popup";
import Toggle from "../components/toggle";
import avatarImg from "../assets/user-avatar.jpg";
import ConfirmPopup from "./confirmPopup";

export default function Profile() {
  const { user, logout, toggleAutoSync } = useUser();
  const { display, close } = usePopup();
  const { isDarkTheme, themeToggle } = useTheme();
  const { autoSync } = user?.settings || {};

  const handleClick = () => {
    const props = {
      title: "Logout",
      description: "Are you sure want to Logout?",
      theme: "danger",
      onCancel() {
        display(<Profile />);
      },
      onConfirm() {
        logout();
        close();
      },
    };

    display(<ConfirmPopup {...props} />);
  };

  return (
    <div className="user-profile">
      <button className="logout" title="logout" onClick={handleClick} autoFocus>
        <MdOutlineLogout />
      </button>

      <div className="details">
        <img src={avatarImg} alt="" />

        <div className="info">
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>

      <hr />

      <div className="settings">
        <div className="theme">
          <span className="title">Dark Mode</span>
          <Toggle ON={isDarkTheme} onToggle={themeToggle} />
        </div>

        <div className="sync">
          <span className="title">Auto Sync</span>
          <Toggle ON={autoSync} onToggle={toggleAutoSync} />
        </div>
      </div>
    </div>
  );
}
