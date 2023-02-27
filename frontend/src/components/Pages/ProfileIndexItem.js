import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPageErrors, fetchPages } from '../../store/pages';


const ProfileIndexItem = ({ page, userId }) => {
    const { title, description, imageUrl } = page;

    return (
        <>
            <div>
                <div>{title}</div>
                <div>{description}</div>
                <img src={imageUrl} />
            </div>
        </>
    )
}

export default ProfileIndexItem;