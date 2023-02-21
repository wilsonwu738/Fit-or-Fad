import "./ShowPage.css"

//change into modal

function ShowPage({ page: { author, text } }) {
    const { username } = author;
    return (
        <div className="page">
            <h3>{username}</h3>
            <img src="page.imageUrl"></img>
            <p>{text}</p>
        </div>
    );
}

export default ShowPage;