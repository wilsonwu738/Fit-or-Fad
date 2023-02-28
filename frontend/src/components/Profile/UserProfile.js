import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { fetchUser, fetchUsers } from '../../store/users';
import ProfileIndexPage from '../Pages/ProfileIndexPage';
import ShowPage from '../Pages/ShowPage';

function UserProfile() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state && state.users ? state.users.user : null);
    // const userPages = useSelector(state => state && state.pages ? Object.values(state.pages) : []);

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId, dispatch])

    // useEffect(() => {
    //     dispatch(fetchUserPages(userId))
    // }, [userId, dispatch])

    return user && (
        <>
            <div id="container">
                <div id="profile">
                    <h2 id="name">[ {user.username} ]</h2>
                    <img src={user.profileImageUrl}></img>
                </div>
                <div id="bio">
                    <label id="bioo">BIO</label>
                </div>
            </div>
            <hr></hr>
            
            <h2>All of {user.username}'s Pages</h2>
            <div id="pages">
            <ProfileIndexPage userId={userId}/>
            </div>
        </>
    );
}

export default UserProfile;