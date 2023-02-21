import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

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

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const menu = (
        <div className="profile-button-dropdown">
            <span className="dropdown-element">{user.username}</span>
            <span className="dropdown-element">{user.email}</span>
            <span className="dropdown-element" onClick={logout}>Log Out</span>
        </div>
    )

    return (
        <div className="profile-button-wrapper">
            <button onClick={openMenu} className="profile-button">{user.username} ▼</button>
            {showMenu ? menu : <></>}
        </div>
    )
}

export default ProfileButton;