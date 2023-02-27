import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "../../store/pages";
import './ShowPage.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import EditPage from "../Edit/EditPage";
import LikePage from "../Likes/Like";


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

  console.log(page)
return page.author && (
  <div className="page"> {/* add the .page class here */}
    <div id="pics">
    <>
    <DeleteButton pageId={page.id}/>
      <button id="editPageButton" onClick={handleUpdateClick}>Edit</button>
      <div className="page">
        <h3>{page.author.username}</h3>
        <img src={page.imageUrl} alt={page.title} />
      </div>
      <div id="textz">
        <h1>{page.title}</h1>
        <hr></hr>
        <h2>👤 {page.author.username}</h2>
        <p>{page.description}</p>
      </div>
      <LikePage pageId={pageId} />
    </>
    </div>
  </div>
  );
}

export default ShowPage;