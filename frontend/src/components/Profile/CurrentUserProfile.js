import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { fetchUser } from '../../store/users';
import UserIndexPage from '../Pages/ProfileIndexPage';
import { Link } from 'react-router-dom';
import plus from '../../images/create.png'
import './Profile.css'


function CurrentUserProfile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    // const userPages = useSelector(state => state.pages ? Object.values(state.pages.user) : []);
    const userPages = useSelector(state => Object.values(state.pages));
    
    userPages.forEach(ele => console.log(ele));

    useEffect(() => {
        dispatch(fetchUserPages(currentUser._id));
        return () => dispatch(clearPageErrors());
    }, [currentUser, dispatch]);

    return (
        <>
            <div id="container">
                <div id="profile">
                    <h2 id="name">[ {currentUser.username} ]</h2>
                    <img src={currentUser.profileImageUrl}></img>
                </div>
                <div id="bio">
                    <label id="bioo">BIO</label>
                </div>
            </div>
            <hr></hr>
            <div id="pages">
                <h2>All of {currentUser.username}'s Pages</h2>
                <UserIndexPage userId={currentUser.id} />
                
            </div>
            <div id="plus">
                <Link to="/newpage">

                    <img id="git" src={plus} alt="git" />
                </Link>
            </div>
        </>
    );
}

export default CurrentUserProfile;