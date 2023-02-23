import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPages } from "../../store/pages";

function ShowPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { pageId } = useParams();
  const page = useSelector((state) => state.pages[pageId]);
//   let page;
  
  useEffect(() => {
    debugger
    dispatch(fetchPages(pageId))
  },[pageId, dispatch])

//   if (!pages || pages.length === 0) {
//     return <div className="no-pages">This user has no pages</div>;
//   }

  if (!page) {
    return <div className="no-pages">This user does not have a page</div>;
  }

//   const { author = "", title = "", description = "", imageUrl = "" } = page;

  return (
    <div className="page">
      <h3>{page.author}</h3>
      <h2>{page.title}</h2>
      <img src={page.imageUrl} alt={page.title} />
      <p>{page.description}</p>
    </div>
  );
}

export default ShowPage;