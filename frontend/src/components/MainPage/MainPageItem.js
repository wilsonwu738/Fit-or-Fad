import React from 'react';
import './MainPageItem.css';

const MainPageItem = (props) => {
    return (
        <>
            <img src={props.page.imageUrl} alt={""}></img>
            <div>{props.page.title}</div>
            <div>{props.page.description}</div>
            <div>Likes: {props.page.liker}</div>
        </>
    )
}

export default MainPageItem;