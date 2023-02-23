import React from 'react';
import { Link } from 'react-router-dom';
import './MainPageItem.css';

const MainPageItem = (props) => {
    const profileLink = () => {
        return "/profile/" + props.page.author._id
    }

    return (
        <>
            <Link to={profileLink}>{props.page.author.username}</Link>
            <div>{props.page.title}</div>
            <img src={props.page.imageUrl} alt={""}></img>
            <div>Likes: {props.page.liker}</div>
        </>
    )
}

export default MainPageItem;