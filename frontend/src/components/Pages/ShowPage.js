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
  let page = useSelector((state) => state && state.pages ? state.pages : null);
  const handleUpdateClick = () => {
    setIsEditing(true);
  };
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  // const items = useSelector(state => state && state.pages ? state.pages.itemGroups[0] : null);
  const items = page?.itemGroups ? page.itemGroups[0].items : null;
  // debugger


  useEffect(() => {
    dispatch(fetchPage(pageId))
  }, [pageId, dispatch])


  

  if (isEditing) {
    return <EditPage page={page} isUpdating={true} setIsEditing={setIsEditing} />;
  }

  const profileLink = () => {
    return "/profile/" + page.author._id;
  }

  const toProfilePage = (e) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/profile/${page.author._id}`;
    }
  }

  const handleClick = (url) => {
    window.open(url, '_blank');
  };
  
  const itemInfo = 
    items ?
      items.map((item, i) => (
        <div> 
          <p key={i}>{item.name}</p> 
          <p key={i} onClick={() => handleClick(item.url)}>{item.url}</p>
        </div> 
      )) : null;
  
  

  // debugger

  if (page.author && page.author._id === currentUser._id) {
    return page.author && (
      <div className="page">
        <div id="pics">
          <img src={page.imageUrl} alt={page.title} />
          <div id="author">
            <div id="profile-link" onClick={toProfilePage}>
              [ {page.author.username} ]
            </div>
            <div id="buttons">
              <DeleteButton pageId={page.id} />
              <button id="editPageButton" onClick={handleUpdateClick}>Edit</button>
              <LikePage pageId={pageId} src={like} className="likeButton" />
            </div>
          </div>

        </div>
        <div id="textz">
          <h1>{page.title}</h1>
          <hr />
          <h2> 👤 {page.author.username}</h2>
          <p>{page.description}</p>
          {itemInfo}
        </div>
      </div>
    );
  } else {
  

  if (page === undefined) return <div>No Page</div>

  const hasEditButton = (
    <div className="buttons">
      <DeleteButton pageId={page.id}  className="pic-buttons"/>
      <button id="editPageButton" onClick={handleUpdateClick} className="pic-buttons">Edit</button>
      <LikePage pageId={pageId} src={like} className="likeButton pic-buttons" />
    </div>
  )

  const hasNoEditButton = (
    <div className="buttons">
      <LikePage pageId={pageId} src={like} className="likeButton pic-buttons" />
    </div>
  )


  return page.author && (
    <div className="page-container">
      <div className="page">
        <div id="pics">
          <img src={page.imageUrl} alt={page.title} />
          <div className="buttons-container">
            {page.author._id === currentUser._id ? hasEditButton : hasNoEditButton}
            
          </div>

        </div>

        <div id="textz">
          <div className="title">{page.title}</div>
          <div className="profile-link" onClick={toProfilePage}>
            👤 <span className="profile-link-text"> {page.author.username}</span>
          </div>
          <div className="text-description">{page.description}</div>

        </div>

      </div>
    </div>
  );

}

}

export default ShowPage;