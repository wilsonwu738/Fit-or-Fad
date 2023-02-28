import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { fetchUser, fetchUsers } from '../../store/users';
import ProfileIndexPage from '../Pages/ProfileIndexPage';
import ShowPage from '../Pages/ShowPage';
import FollowButton from '../Follows/follow';

function UserProfile() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state && state.users ? state.users.user : null);

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId, dispatch])

    return user && (
        <>
            <h1>{user.username}</h1>
            <div><FollowButton userId={userId}/></div>
            <div id="profile">
                <img src={user.profileImageUrl} />
                <label id="bio">BIO
                    <div>{user.bio}</div>
                </label>
            </div>
            <hr></hr>
            
            <h2>All of {user.username}'s Pages</h2>

            <ProfileIndexPage userId={userId}/>

        </>
    );
}

export default UserProfile;