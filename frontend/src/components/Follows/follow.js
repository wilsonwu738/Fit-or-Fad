import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, deleteFollow } from '../../store/users';

function FollowButton({ userId }) {
    // debugger
  const dispatch = useDispatch();
  
  const currentUser = useSelector(state => state.session.user);
  debugger
  const currentStatus = currentUser ? currentUser.following.includes(userId) : false
  const [isFollowing, setIsFollowing] = useState(currentStatus);
    // debugger
  const handleFollow = async () => {
    debugger
    dispatch(followUser(userId));
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    dispatch(deleteFollow(userId));
    setIsFollowing(false);
  }

  if (isFollowing) {
    return <button onClick={handleUnfollow}>Following</button>;
  } else if (currentUser && currentUser.id !== userId) {
    return <button onClick={handleFollow}>Follow</button>;
  }

}

export default FollowButton;
