import { deletePage } from "../../store/pages";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function DeleteButton() {
    const dispatch = useDispatch();
    const { pageId } = useParams();
    const history = useHistory();
    // const id = useSelector(state => state.page.id);
    let page = useSelector((state) => state && state.pages ? state.pages : null);
   const handleClick = () => {
    dispatch(deletePage(pageId))
    history.push('/');
   }

    return (
        <>
            <button className="delete-button" onClick={handleClick}>Delete</button>
            
        </>
    )

};

export default DeleteButton;