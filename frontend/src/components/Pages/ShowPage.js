import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "../../store/pages";
import './ShowPage.css'

function ShowPage() {
  const dispatch = useDispatch();
  // const { userId } = useParams();
  const { pageId } = useParams();
  
  let page = useSelector((state) => state && state.pages ? state.pages : null);
  
  useEffect(() => {
    dispatch(fetchPage(pageId))
  },[pageId, dispatch])


return page.author && (
  <div className="page"> {/* add the .page class here */}
    <div id="pics">
      <img src={page.imageUrl} alt={page.title} />
    </div>
    <div id="textz">
      <h1>{page.title}</h1>
      <hr></hr>
      <h2>👤 {page.author.username}</h2>
      <p>{page.description}</p>
    </div>
  </div>
);
}

export default ShowPage;