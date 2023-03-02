import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPageErrors, fetchPages } from '../../store/pages';
import "./ProfileIndexItem.css"


const ProfileIndexItem = ({ page, userId }) => {
    const { title, description, imageUrl } = page;

    return (
        <>
            <div id="item">
                <img src={imageUrl} />
                <div>{title}</div>
                <br></br>
                <div>"{description}"</div>
            </div>
        </>
    )
}

export default ProfileIndexItem;