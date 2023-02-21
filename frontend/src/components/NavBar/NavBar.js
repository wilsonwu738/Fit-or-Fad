import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './NavBar.css';
import { login } from '../../store/session';
import logins from '../../images/log.png';
import signup from '../../images/signup.png';
import logo from '../../images/logo.png';
import longlogo from '../../images/longlogo.png';
import profile from '../../images/p.png';


function NavBar() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <>
        <NavLink exact to="/"><img id="home" src={logo} alt="" /></NavLink>
        <NavLink exact to="/"><img id="home" src={longlogo} alt="" /></NavLink>

        <ProfileButton user={sessionUser} src={profile} alt=""/>
        </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink exact to="/"><img id="home" src={logo} alt="" /></NavLink>
                <NavLink exact to="/"><img id="home2" src={longlogo} alt="" /></NavLink>
                <NavLink to="/login"><img id="login" src={logins} alt="" /></NavLink>
                <NavLink to="/signup"><img id="signup" src={signup} alt="" /></NavLink>
            </>
        );
    }

    return (
        <ul>
            <li>
                {/* <NavLink exact to="/"><img id="home" src={logo} alt="home" /></NavLink>
                <NavLink exact to="/"><img id="home2" src={longlogo} alt="home" /></NavLink> */}
                {sessionLinks}
            </li>
        </ul>
    );
}

export default NavBar;