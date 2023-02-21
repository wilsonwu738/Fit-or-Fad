import "./ShowPage.css"

//change into modal

function ShowPage({ page: { author } }) {
    const { username } = author;
    return (
        <div className="page">
            <h3>{username}</h3>
            <p>img</p>
            <p>{text}</p>
        </div>
    );
}

export default ShowPage;