import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../store/follows';

function FollowButton({ userId }) {
    // debugger
  const dispatch = useDispatch();
  
  const currentUser = useSelector(state => state.session.user);
  const [isFollowing, setIsFollowing] = useState(false);
    // debugger
  const handleFollow = async () => {
    debugger
    dispatch(followUser(userId));
    setIsFollowing(true);
  };

  if (isFollowing) {
    return <button>Following</button>;
  } else if (currentUser && currentUser.id !== userId) {
    return <button onClick={handleFollow}>Follow</button>;
  }

}

export default FollowButton;

