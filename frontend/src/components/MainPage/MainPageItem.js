import React from 'react';
import './MainPageItem.css';

const MainPageItem = (props) => {


    return (
        <>
            <div>{props.page.title}</div>
            <img src={props.page.imageUrl} alt={""}></img>
            <div>Likes: {props.page.liker}</div>
        </>
    )
}

export default MainPageItem;