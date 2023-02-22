import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import ShowPage from '../Pages/ShowPage';

function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userPages = useSelector(state => Object.values(state.pages.user))

    useEffect(() => {
        dispatch(fetchUserPages(currentUser._id));
        return () => dispatch(clearPageErrors());
    }, [currentUser, dispatch]);

    if (userPages.length === 0) {
        return <div>{currentUser.username} has no Pages</div>;
    } else {
        return (
            <>
            <div id="profile">
                <img src={userPages.author.profileImageUrl}></img>
                <label id="bio">BIO</label>
            </div>
            <hr></hr>
                <h2>All of {currentUser.username}'s Pages</h2>
                {userPages.map(page => (
                    <ShowPage
                        key={page._id}
                        page={page}
                    />
                ))}
                <div>plus sign to make pages/book</div>
            </>
        );
    }
}

export default Profile;