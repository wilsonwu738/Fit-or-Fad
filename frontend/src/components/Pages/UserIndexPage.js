import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPageErrors, fetchUserPages } from '../../store/pages';
// import ShowPage from './ShowPage';
import UserIndexItem from './UserIndexItem';

function UserIndexPage ({userId}) {
    const dispatch = useDispatch();
    const pages = useSelector(state => state.pages && Object.values(state.pages));
    // debugger
    useEffect(() => {
        dispatch(fetchUserPages(userId));
        return () => dispatch(clearPageErrors());
    }, [dispatch])

    if (!pages || pages.length === 0) return (<div>There are no Pages</div>);

    return (
        <>
            <h2>All Pages</h2>

            {pages.map(page => (
                <UserIndexItem key={page._id} page={page} />
            ))}
        </>
    );
}

export default UserIndexPage;


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearPageErrors, fetchPages } from '../../store/pages';
// import ShowPage from './ShowPage';

// function IndexPage () {
//     const dispatch = useDispatch();
//     const pages = useSelector(state => Object.values(state.pages.all));

//     useEffect(() => {
//         dispatch(fetchPages());
//         return () => dispatch(clearPageErrors());
//     }, [dispatch])

//     if (pages.length === 0) return <div>There are no Pages</div>;

//     return (
//         <>
//             <h2>All Pages</h2>
//             {pages.map(page => (
//                 <ShowPage key={page._id} page={page} />
//             ))}
//         </>
//     );
// }

// export default IndexPage;