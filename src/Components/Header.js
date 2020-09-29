import React from "react";
import "../style/Header.css";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useStateValue } from "../reducer/StateProvider";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="Header">
      <div className="Header__left">
        <p>Whatever</p>
      </div>
      <div className="Header__search">
        <AccessTimeIcon className="Header__icon" />
        <input
          type="text"
          placeholder="Search Majd's Chats"
          className="search__input"
        />
        <HelpOutlineIcon className="Header__icon" />
      </div>
      <div className="Header__right">
        <img
          src={user?.userImage}
          alt="userImage"
          className="header__userImage"
        />
      </div>
    </div>
  );
}

export default Header;

// none
// search + 3
// foto
