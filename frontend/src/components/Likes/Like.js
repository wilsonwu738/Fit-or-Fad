import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePage, unlikePage } from "../../store/likes";
// import { fetchPage } from "../../store/pages";

const LikePage = ({ pageId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [liked, setLiked] = useState(false);

  const page = useSelector((state) => state.pages)

  useEffect(() => {
    // debugger
    if (page && page.liker && page.liker.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [page, user]);

  const handleLikeClick = () => {
    if (liked) {
      dispatch(unlikePage(pageId, user._id));
    } else {
      dispatch(likePage(pageId, user._id));
    }
  
    setLiked(!liked);
  };

  return (
    <button onClick={handleLikeClick}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikePage;