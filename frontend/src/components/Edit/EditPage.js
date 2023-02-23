import React, { useState } from "react";

const EditPage = (props) => {
  const [page, setPage] = useState(props.location.state.page); // get the page prop from props passed from the MainPageItem component using location state and initialize a state variable for the page

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPage({ ...page, [name]: value }); // update the state variable for the page when an input field is changed
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // you can use the page object in the state to submit the updated page data to your backend or update the page data in your app's state
  };
console.log(page)
  return (
    <>
      <h2>Edit Post: {page.title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={page.title} onChange={handleInputChange} />
        </label>
       
        
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default EditPage;