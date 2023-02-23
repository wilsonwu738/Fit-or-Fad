import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { fetchUser, fetchUsers } from '../../store/users';
import ShowPage from '../Pages/ShowPage';

// <UserProfile id={userId} > this is what the link will look like
function UserProfile() {
    const dispatch = useDispatch();
    // const userPages = useSelector(state => state.pages ? Object.values(state.pages.user) : []);
    const { userId } = useParams();
    const user = useSelector(state => state && state.users ? state.users.user : null);
    const userPages = useSelector(state => state && state.pages ? Object.values(state.pages) : []);

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId, dispatch])

    useEffect(() => {
        dispatch(fetchUserPages(userId))
    }, [userId, dispatch])



    console.log(userPages);

    return user && (
        <>
            <h1>{user.username}</h1>
            <div id="profile">
                <img src={user.profileImageUrl} />
                <label id="bio">BIO</label>
            </div>
            <hr></hr>
            
            <h2>All of {user.username}'s Pages</h2>

            {userPages.map(page => (
                <div>
                    <h3>{page.author.username}</h3>
                    <img src={page.imageUrl}></img>
                    <h3>{page.title}</h3>
                    <h3>{page.description}</h3>
                </div>
            ))}
        </>
    );
}

export default UserProfile;