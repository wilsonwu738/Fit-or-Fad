import React from 'react';
import { Link } from 'react-router-dom';
import './MainPageItem.css';

const MainPageItem = (props) => {
    const profileLink = () => {
        return "/profile/" + props.page.author._id
    }

    return (
        <Link className="index-link" to={`/show/${props.page._id}`}>
        <div className="main-page-item">
            <div className="main-page-image-container">
                <img src={props.page.imageUrl} alt="" className="main-page-image" />
            </div>
            <br></br>

            <div>{props.page.title}</div>
            <br></br>
            <div>Likes: {props.page.liker}</div>
        </div>
        </Link>
    )
}

export default MainPageItem;