import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePage, unlikePage } from "../../store/likes";
import { fetchPage } from "../../store/pages";

const LikePage = ({ pageId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user);
  const [liked, setLiked] = useState(false);

  const page = useSelector((state) => state.pages[pageId]);

  useEffect(() => {
    if (page && page.likers && page.likers.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [page, userId]);

  const handleLikeClick = () => {
    if (liked) {
      dispatch(unlikePage(pageId));
    } else {
      dispatch(likePage(pageId));
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