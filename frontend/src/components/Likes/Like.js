import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePage, deleteLike } from "../../store/pages";
import { fetchUser } from "../../store/users";
// import { fetchPage } from "../../store/pages";

const LikePage = ({ pageId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users.user)
  const currentStatus = user?.likePage?.includes(pageId)
   
  

  const [liked, setLiked] = useState(currentStatus);
  const page = useSelector((state) => state.pages)


  useEffect(() => {
    dispatch(fetchUser(currentUser._id))
  }, [liked])


  const handleLike = (e) => {
    e.preventDefault()
    dispatch(likePage(pageId))
    setLiked(true)
  }

  const handleUnlike = (e) => {
    e.preventDefault()
    dispatch(deleteLike( pageId ))
    setLiked(false)
  }

  if (liked) {
    return  <button onClick={handleUnlike}>Unlike</button>
   } else {
    return <button onClick={handleLike}>Like</button>
   }
};

export default LikePage;