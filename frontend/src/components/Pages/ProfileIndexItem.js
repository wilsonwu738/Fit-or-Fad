import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPageErrors, fetchPages } from "../../store/pages";
import { Link } from "react-router-dom";
import "./ProfileIndexItem.css";

const ProfileIndexItem = ({ page, userId }) => {
  const { title, description, imageUrl } = page;

  return (
    <>
      <Link className="profilePageItem"to={`/show/${page?._id}`}>
        <div id="item">
          <img src={imageUrl} />
          <div id="page-title">{title}</div>
          <hr></hr>
          <br></br>
          <div id="page-description">{description}</div>
        </div>
      </Link>
    </>
  );
};

export default ProfileIndexItem;
