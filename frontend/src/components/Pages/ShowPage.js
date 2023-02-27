import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "../../store/pages";
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import './ShowPage.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import EditPage from "../Edit/EditPage";
import LikePage from "../Likes/Like";
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
  },[isEditing, pageId, dispatch])





  if (isEditing) {
    return <EditPage page={page} isUpdating={true} setIsEditing={setIsEditing} />;
  }

  const profileLink = () => {
    return "/profile/" + page.author._id;
  }

  return page.author && (
    <div className="page">
      <div id="pics">
        <img src={page.imageUrl} alt={page.title} />
        <div id="author">
          <Link to={profileLink}>[ {page.author.username} ]</Link>
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
      <LikePage pageId={pageId} />
    </>
    </div>
  );
}

export default ShowPage;