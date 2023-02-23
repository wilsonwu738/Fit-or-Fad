import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "../../store/pages";

function ShowPage() {
  const dispatch = useDispatch();
  // const { userId } = useParams();
  const { pageId } = useParams();
  let page = useSelector((state) => state && state.pages ? state.pages : null);
  
  useEffect(() => {
    dispatch(fetchPage(pageId))
  },[pageId, dispatch])

  return page.author && (   
    <div className="page">
      <h3>{page.author.username}</h3>
      <img src={page.imageUrl} alt={page.title} />
      <h2>{page.title}</h2>
      <p>{page.description}</p>
    </div>
  );
}

export default ShowPage;