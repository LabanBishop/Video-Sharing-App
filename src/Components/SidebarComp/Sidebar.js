import React from "react";
import "./_Sidebar.scss";
import { Link } from "react-router-dom";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const handleClick = (screen) => {
    handleToggleSidebar(false);
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/">
      <li onClick={() => handleClick("home")}>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      </Link>
      <Link to="/Profile">
      <li onClick={() => handleClick("Profile")}>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      </Link>
      <Link to="/Upload">
      <li onClick={() => handleClick("upload")}>
        <MdExitToApp size={23} />
        <span>Upload</span>
      </li>
      </Link>
      <li onClick={() => handleClick("logout")}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
    </nav>
  );
};

export default Sidebar;