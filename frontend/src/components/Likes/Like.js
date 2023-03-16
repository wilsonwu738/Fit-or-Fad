import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePage, deleteLike } from "../../store/pages";
import { fetchUser } from "../../store/users";

const LikePage = ({ pageId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users.user);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(currentUser._id));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    if (user?.likedPage?.includes(pageId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, pageId]);

  const handleLike = (e) => {
    console.log("handleLike");
    debugger;
    e.preventDefault();
    dispatch(likePage(pageId));
    setLiked(true);
  };

  const handleUnlike = (e) => {
    console.log("handleUnlike");
    debugger;
    e.preventDefault();
    dispatch(deleteLike(pageId));
    setLiked(false);
  };

  if (liked) {
    return <button onClick={handleUnlike}>Unlike</button>;
  } else {
    return (
      <button className="showpagebuttons" onClick={handleLike}>
        Like
      </button>
    );
  }
};

export default LikePage;
