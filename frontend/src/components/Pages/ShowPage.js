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
  const { pageId } = useParams();
  const dispatch = useDispatch();

  const page = useSelector((state) => {
    // debugger;
    return state.pages[pageId]
  });
  const currentUser = useSelector(state => state.session.user);
  // let page = useSelector((state) => state && state.pages ? state.pages : null);
  // let page = useSelector((state) => state && state.pages[pageId] ? state.pages[pageId] : null);
  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  console.log(page);

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

  // debugger
  // if (page === null) {
  //   return (
  //     <div>No Page Found</div>

  //   );
  // } else {
  //   return (
  //     <div>Hello World</div>
  //   )
  // }
  debugger

  if (page === undefined) return <div>No Page</div>

  if (page.author && page.author._id === currentUser._id) {
    return (
      <div className="page">
        <div id="pics">
          <img src={page.imageUrl} alt={page.title} />
          <div id="author">
            <div id="profile-link" onClick={toProfilePage}>
              [ {page.author.username} ]
            </div>
            <div id="buttons">
              {/* <DeleteButton pageId={page.id} /> */}
              <button id="editPageButton" onClick={handleUpdateClick}>Edit</button>
              {/* <LikePage pageId={pageId} src={like} className="likeButton" /> */}
            </div>
          </div>

        </div>
        <div id="textz">
          <h1>{page.title}</h1>
          <hr />
          <h2> 👤 {page.author.username}</h2>
          <p>{page.description}</p>

        </div>

      </div>
    );
  } else {
    return (
      <div className="page">
        <div id="pics">
          <img src={page.imageUrl} alt={page.title} />
          <div id="author">
            <div id="profile-link" onClick={toProfilePage}>
              [ {page.author.username} ]
              <Link to={profileLink}>[ {page.author.username} ]</Link>
            </div>
            <div id="buttons">
              <LikePage pageId={pageId} src={like} className="likeButton" />
            </div>
          </div>

        </div>
        <div id="textz">
          <h1>{page.title}</h1>
          <hr />
          <h2> 👤 {page.author.username}</h2>
          <p>{page.description}</p>

        </div>

      </div>

    )
  }


}



export default ShowPage;