import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPageErrors, fetchPages } from '../../store/pages';
import ShowPage from './ShowPage';

function IndexPage () {
    const dispatch = useDispatch();
    const pages = useSelector(state => Object.values(state.pages.all));

    useEffect(() => {
        dispatch(fetchPages());
        return () => dispatch(clearPageErrors());
    }, [dispatch])

    if (pages.length === 0) return <div>There are no Pages</div>;

    return (
        <>
            <h2>All Pages</h2>
            {pages.map(page => (
                <ShowPage key={page._id} page={page} />
            ))}
        </>
    );
}

export default IndexPage;