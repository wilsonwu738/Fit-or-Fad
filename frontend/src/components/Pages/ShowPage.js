import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ShowPage({ page }) {
    // Check if pages prop is defined
    const {pageId} = useParams()

    // useEffect(()=> dispatchEvent(fetchPage(pageId)),
    // [])

    if (!page) {
        return <div>Loading...</div>;
    }

    // Destructure the pages object and set default values for the properties
    const { author = '', title = '', description = '', imageUrl = '' } = page;

    return (
        <div className="page">
            <h1>dan</h1>
            <h3>{author}</h3>
            <h2>{title}</h2>
            <img src={imageUrl} alt={title} />
            <p>{description}</p>
        </div>
    );
}

export default ShowPage;
