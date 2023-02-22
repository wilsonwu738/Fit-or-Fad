import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './NavBar.css';
// import { login } from '../../store/session';
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
            <div className="navbar-background">

                <div className="navbar">
                    {/* <NavLink exact to="/newpage" id="createPage"></NavLink> */}
                    <NavLink exact to="/"><img className="nav-elements small-logo" src={logo} alt="" /></NavLink>
                    <NavLink exact to="/"><img className="nav-elements big-logo" src={longlogo} alt="" /></NavLink>

                    <ProfileButton className="profile-button" user={sessionUser}><img src={profile} alt=""></img></ProfileButton>
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className="navbar-background">
                <div className="navbar">
                    <NavLink exact to="/"><img className="nav-elements small-logo" src={logo} alt="" /></NavLink>
                    <NavLink exact to="/"><img className="nav-elements big-logo" src={longlogo} alt="" /></NavLink>
                    <div className="session-buttons">
                        <NavLink to="/login"><img className="nav-elements login-button" src={logins} alt="" /></NavLink>
                        <NavLink to="/signup"><img className="nav-elements signup-button" src={signup} alt="" /></NavLink>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {sessionLinks}
        </>
    );
}

export default NavBar;