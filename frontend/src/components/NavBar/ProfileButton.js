import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
import { Link } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const menu = (
    <div className="profile-dropdown">
      <div className="profile-dropdown-content">
        <Link to={"/currentprofile"}>
          <span className="dropdown-element">Profile</span>
        </Link>
        <span className="dropdown-element" onClick={logout}>
          Log out
        </span>
      </div>
    </div>
  );

  return (
    <div className="profile-wrapper">
      <div className="profile-content">
        <div className="profile-username">{user.username}</div>
        <button onClick={openMenu} className="profile-button">
          ▼
        </button>
      </div>
      {showMenu ? menu : <></>}
    </div>
  );
}

export default ProfileButton;
