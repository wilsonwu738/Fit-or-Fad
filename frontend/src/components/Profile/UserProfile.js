import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { fetchUser, fetchUsers } from '../../store/users';
import ShowPage from '../Pages/ShowPage';

// <UserProfile id={userId} > this is what the link will look like
function UserProfile({authorId}) {
    const dispatch = useDispatch();
    // const userPages = useSelector(state => state.pages ? Object.values(state.pages.user) : []);

    const users = useSelector(state => state.users);
    // const user = users.find(obj => obj.id === userId)
    useEffect(() => {
        dispatch(fetchUser(authorId))
    }, [dispatch])
    
    console.log(users);

    return (
        <>
            <div id="profile">
                {/* <img src={userPages.author.profileImageUrl}></img> */}
                <label id="bio">BIO</label>
            </div>
            <hr></hr>
            <h2>All of this user's Pages</h2>
            {/* {userPages.map(page => (
                <ShowPage
                    key={page._id}
                    page={page}
                />
            ))} */}
        </>
    );
}

export default UserProfile;