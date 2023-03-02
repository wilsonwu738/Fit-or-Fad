import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPageItem.css';
// import { useHistory } from 'react-router-dom';
import EditPage from '../Edit/EditPage';

const MainPageItem = (props) => {
//   const history = useHistory(); 
//   const [isEditing, setIsEditing] = useState(false);

//   const handleUpdateClick = () => {
//     setIsEditing(true);
//   };
  
//   if (isEditing) {
//     return <EditPage page={props.page} isUpdating={true} setIsEditing={setIsEditing} />;
//   }

  
    // const profileLink = () => {
    //     return "/profile/" + props.page.author._id
    // }

    // this does not let the link persist the state
    // LINK PERSISTS STATE

    // const toShowPage = (e) => {
    //     if (typeof window !== 'undefined') {
    //         window.location.href = `/show/${props.page._id}`;
    //     }
    // }

    return (
        <Link className="main-page-item" to={`/show/${props.page._id}`}>
        {/* <div className="main-page-item" onClick={toShowPage}> */}
            <div className="main-page-image-container">
                <img src={props.page.imageUrl} alt="" className="main-page-image" />
            </div>
            <br></br>

            <div>{props.page.title}</div>
            <br></br>
            <div>Likes: {props.page.liker}</div>
            {/* <button id="editPageButton" onClick={handleUpdateClick}>Edit</button> */}
        {/* </div> */}
        </Link>
    )
}

export default MainPageItem;