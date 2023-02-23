import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { Link } from 'react-router-dom';

import ShowPage from '../Pages/ShowPage';
import plus from '../../images/create.png'

function CurrentUserProfile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    // const userPages = useSelector(state => state.pages ? Object.values(state.pages.user) : []);

    // useEffect(() => {
    //     dispatch(fetchUserPages(currentUser._id));
    //     return () => dispatch(clearPageErrors());
    // }, [currentUser, dispatch]);

    return (
        <>
            <div id="profile">
                <img src={currentUser.profileImageUrl}></img>
                <label id="bio">BIO</label>
            </div>
            <hr></hr>
            <h2>All of {currentUser.username}'s Pages</h2>
            {/* {userPages.map(page => (
                <ShowPage
                    key={page._id}
                    page={page}
                />
            ))} */}
            <div id="plus">
                <Link to="/newpage">

                    <img id="git" src={plus} alt="git" />
                </Link>
            </div>
        </>
    );
}

export default CurrentUserProfile;