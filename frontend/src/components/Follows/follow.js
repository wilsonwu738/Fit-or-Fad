import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, deleteFollow } from "../../store/users";
import "./Follow.css"

function FollowButton({ userId }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);

  const currentStatus = currentUser
    ? currentUser.following.includes(userId)
    : false;
  const [isFollowing, setIsFollowing] = useState(currentStatus);

  const handleFollow = async () => {
    dispatch(followUser(userId));
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    dispatch(deleteFollow(userId));
    setIsFollowing(false);
  };

  if (isFollowing) {
    return < button className="followButton" onClick={handleUnfollow}>Following</button>;
  } else if (currentUser && currentUser.id !== userId) {
    return < button className="followButton" onClick={handleFollow}>Follow</button>;
  }
}

export default FollowButton;
