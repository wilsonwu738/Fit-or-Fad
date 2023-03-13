import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainPageItem.css";

const MainPageItem = (props) => {
  return (
    <Link className="main-page-item" to={`/show/${props.page?._id}`}>
      <div className="main-page-image-container">
        <img src={props.page?.imageUrl} alt="" className="main-page-image" />
      </div>
      <br></br>
      <div className="main-page-item-title">
        <div>{props.page?.title}</div>
        <br></br>
        <div>Likes: {props.page?.liker?.length}</div>
      </div>
    </Link>
  );
};

export default MainPageItem;
