import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { fetchUser, fetchUsers } from '../../store/users';
import UserIndexPage from '../Pages/UserIndexPage';
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
            <h1>{user.username}</h1>
            <div id="profile">
                <img src={user.profileImageUrl} />
                <label id="bio">BIO</label>
            </div>
            <hr></hr>
            
            <h2>All of {user.username}'s Pages</h2>

            <UserIndexPage userId={userId}/>

        </>
    );
}

export default UserProfile;