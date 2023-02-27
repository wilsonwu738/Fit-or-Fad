import React from "react";
const ProfileIndexItem = ({ page }) => {
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