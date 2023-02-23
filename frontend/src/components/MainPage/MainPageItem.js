import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  
    const profileLink = () => {
        return "/profile/" + props.page.author._id
    }

    return (

        <div className="main-page-item">
            <div className="main-page-image-container">
                <img src={props.page.imageUrl} alt="" className="main-page-image" />
            </div>
            <br></br>

            <div>{props.page.title}</div>
            <br></br>
            <div>Likes: {props.page.liker}</div>
            <button id="editPageButton" onClick={handleUpdateClick}>Edit</button>
        </div>
    )
}

export default MainPageItem;