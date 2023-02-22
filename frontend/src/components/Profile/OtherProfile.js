import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPages, clearPageErrors } from '../../store/pages';
import { fetchUser } from '../../store/users';
import ShowPage from '../Pages/ShowPage';

function OtherProfile() {
    const dispatch = useDispatch();
    const userPages = useSelector(state => state.pages ? Object.values(state.pages.user) : []);
    const user = useSelector(state => state)

    useEffect(() => {
        dispatch(fetchUser(user._id));
        return () => dispatch(clearPageErrors());
    }, [user, dispatch]);

    if (userPages.length === 0) {
        return (
            <div>This user has no Pages</div>
        );
    }
    
    return (
        <>
            <div id="profile">
                <img src={userPages.author.profileImageUrl}></img>
                <label id="bio">BIO</label>
            </div>
            <hr></hr>
            <h2>All of this user's Pages</h2>
            {userPages.map(page => (
                <ShowPage
                    key={page._id}
                    page={page}
                />
            ))}
        </>
    );
}

export default OtherProfile;