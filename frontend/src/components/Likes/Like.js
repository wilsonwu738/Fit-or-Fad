import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePage, deleteLike } from "../../store/pages";
// import { fetchPage } from "../../store/pages";

const LikePage = ({ pageId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const currentStatus = currentUser ? currentUser?.likedPage.includes(pageId) : false

  const [liked, setLiked] = useState(currentStatus);
  const page = useSelector((state) => state.pages)
debugger
  const handleLike = async () => {
    dispatch(likePage(pageId))
    setLiked(true)
  }

  const handleUnlike = async () => {
    dispatch(deleteLike( pageId ))
    setLiked(false)
  }

  if (liked) {
    return  <button onClick={handleUnlike}>Unlike</button>
   } else {
    return <button className="showpagebuttons" onClick={handleLike}>Like</button>
   }
};

export default LikePage;