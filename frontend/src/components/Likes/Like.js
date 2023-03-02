import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePage, deleteLike } from "../../store/likes";
// import { fetchPage } from "../../store/pages";

const LikePage = ({ pageId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [liked, setLiked] = useState(false);
  const currentStatus = user ? user.likedPage.includes(pageId) : false
  const page = useSelector((state) => state.pages)

  const handleLike = async () => {
    dispatch(likePage(pageId))
    setLiked(true)
  }

  const handleUnlike = async () => {
    dispatch(deleteLike( pageId ))
    setLiked(false)
  }

  if (liked) {
    return  <button onClick={handleLike}>Like</button>
   } else {
    return <button onClick={handleUnlike}>Unlike</button>
   }
};

export default LikePage;