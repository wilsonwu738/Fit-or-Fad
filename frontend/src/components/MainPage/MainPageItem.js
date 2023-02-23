import React from 'react';
import './MainPageItem.css';

const MainPageItem = (props) => {
    

    return (
        <div className="main-page-item">
            <div className="main-page-image-container">
                <img src={props.page.imageUrl} alt="" className="main-page-image" />
            </div>
            <br></br>
            <div>{props.page.title}</div>
            <br></br>
            <div>Likes: {props.page.liker}</div>
        </div>
    )
}

export default MainPageItem;