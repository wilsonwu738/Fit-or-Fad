import React, { useState } from 'react';
import './MainPageItem.css';
import { useHistory } from 'react-router-dom';
import EditPage from '../Edit/EditPage';

const MainPageItem = (props) => {
  const history = useHistory(); 
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };
  
  if (isEditing) {
    return <EditPage page={props.page} isUpdating={true} setIsEditing={setIsEditing} />;
  }

  return (
    <>
      <div>{props.page.title}</div>
      <img src={props.page.imageUrl} alt={""}></img>
      <div>Likes: {props.page.likes}</div>
      <button id="editPageButton" onClick={handleUpdateClick}>Edit</button>
    </>
  );
};

export default MainPageItem;