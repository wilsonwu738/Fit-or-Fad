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
  const handleUpdateClick = () => {
    setIsEditing(true);
  };
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  let page = useSelector((state) => {
    const pages = state.pages;
    if (pages && pages._id === pageId) {
      return pages;
    }
    return null;
  });
  // const items = useSelector(state => state && state.pages ? state.pages.itemGroups[0] : null);
  const items = page?.itemGroups ? page.itemGroups[0].items : null;

  // debugger


  useEffect(() => {
    dispatch(fetchPage(pageId))
  }, [pageId, dispatch, isEditing])




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
    const protocol = /^https?:\/\//i.test(url) ? "" : "http://";
    window.open(protocol + url, "_blank");
  };

  const itemInfo =
    items ?
      items.map((item, i) => (
        <div className="item-individual-container">
          <div className="item-name" key={i} onClick={() => handleClick(item.url)} >{item.name}</div>
          {/* <div className="item-url" key={i} onClick={() => handleClick(item.url)}>{item.url}</div> */}
        </div>
      )) : null;

  const hasEditButton = (
    <div className="buttons">

      <DeleteButton pageId={page?.id} className="pic-buttons" />
      <button onClick={handleUpdateClick}>Edit</button>
      <LikePage pageId={pageId} src={like} className="likeButton pic-buttons" />
    </div>
  )

  const hasNoEditButton = (
    <div className="buttons">
      <LikePage pageId={pageId} src={like} className="likeButton pic-buttons" />
    </div>
  )

  if (page === undefined) return <div>No Page</div>

  return page?.author && (
    <div className="page-container">
      <div className="page">
        <div id="pics">
          <img src={page.imageUrl} alt={page.title} />
          <div className="buttons-container">
            {page.author._id === currentUser._id ? hasEditButton : hasNoEditButton}
          </div>
        </div>

        <div id="textz">

          <div className="text-content">
            <div className="title">{page.title}</div>
            <div className="profile-link" onClick={toProfilePage}>
              👤 <span className="profile-link-text"> {page.author.username}</span>
            </div>
            <div className="text-description">{page.description}</div>
            <div className="item-container">
              {itemInfo}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

}

// }

export default ShowPage;