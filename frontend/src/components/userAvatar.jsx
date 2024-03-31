import { FaUserAstronaut } from "react-icons/fa";
import { useUser } from "../state/user";
import { usePopup } from "../layouts/popup";
import Profile from "../layouts/profile";

export default function UserAvatar() {
  const { user } = useUser();
  const { display } = usePopup();

  const handleClick = () => {
    display(<Profile />);
  };

  return (
    <button className="user-avatar" onClick={handleClick}>
      {user.name} <FaUserAstronaut />
    </button>
  );
}
