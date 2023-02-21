import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPageErrors, composePage } from '../../store/pages';
import PageBox from './PageBox';
import './PageCompose.css';

// change into modal
function MakePage() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const author = useSelector(state => state.session.user);
    const newPage = useSelector(state => state.pages.new);
    const errors = useSelector(state => state.errors.pages);

    useEffect(() => {
        return () => dispatch(clearPageErrors());
    }, [dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composePage({ text }));
        setText('');
    };

    const update = e => setText(e.currentTarget.value);

    return (
        <>
            <form className="compose-page" onSubmit={handleSubmit}>
                <input
                    type="textarea"
                    value={text}
                    onChange={update}
                    placeholder="Write your page..."
                    required
                />
                <div className="errors">{errors?.text}</div>
                <input type="submit" value="Submit" />
            </form>
            <div className="page-preview">
                <h3>Page Preview</h3>
                {text ? <PageBox page={{ text, author }} /> : undefined}
            </div>
            <div className="previous-page">
                <h3>Previous Page</h3>
                {newPage ? <PageBox page={newPage} /> : undefined}
            </div>
        </>
    )
}

export default MakePage;