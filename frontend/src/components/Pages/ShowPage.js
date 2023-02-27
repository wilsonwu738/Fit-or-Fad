import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "../../store/pages";
import { NavLink } from 'react-router-dom';
import './ShowPage.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import EditPage from "../Edit/EditPage";
import like from "../../images/like.png"


function ShowPage() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { pageId } = useParams();


  let page = useSelector((state) => state && state.pages ? state.pages : null);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };


  useEffect(() => {
    dispatch(fetchPage(pageId))
  }, [isEditing, pageId, dispatch])


  if (isEditing) {
    return <EditPage page={page} isUpdating={true} setIsEditing={setIsEditing} />;
  }


  return page.author && (
    <div className="page">
      <div id="pics">
        <img src={page.imageUrl} alt={page.title} />
        <div id="author">
          <h3>[ {page.author.username} ]</h3>
          <div id="buttons">
            <DeleteButton pageId={page.id} />
            <button id="editPageButton" onClick={handleUpdateClick}>Edit</button>

          </div>
        </div>

      </div>
      <div id="textz">
        <h1>{page.title}</h1>
        <hr />
        <h2> 👤 {page.author.username}</h2>
        <p>{page.description}</p>
        <NavLink exact to="/">
          <img id="like" src={like} alt="" />
        </NavLink>
      </div>
    </div>
  );
}

export default ShowPage;