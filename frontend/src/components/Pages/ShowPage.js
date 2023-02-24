import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "../../store/pages";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditPage from "../Edit/EditPage";


function ShowPage() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { pageId } = useParams();
  // debugger
  let page = useSelector((state) => state && state.pages ? state.pages : null);


  const handleUpdateClick = () => {
    setIsEditing(true);
  };
  

  useEffect(() => {
    // debugger
    dispatch(fetchPage(pageId))
  },[pageId, dispatch])


  if (isEditing) {
    return <EditPage page={page} isUpdating={true} setIsEditing={setIsEditing} />;
  }

  return page.author && ( 
    <>
    <DeleteButton pageId={page.id}/>
    <button id="editPageButton" onClick={handleUpdateClick}>Edit</button>
    <div className="page">
      <h3>{page.author.username}</h3>
      <img src={page.imageUrl} alt={page.title} />
      <h2>{page.title}</h2>
      <p>{page.description}</p>
    </div>
    </>
  );
}

export default ShowPage;