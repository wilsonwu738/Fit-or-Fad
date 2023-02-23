import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPage } from "../../store/pages";

const EditPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.page.title);
  const [imageUrl, setImageUrl] = useState(props.page.imageUrl);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedPage = { ...props.page, title, imageUrl };
      await dispatch(editPage(updatedPage));
      props.setIsEditing(false);
      history.push("/");
    } catch (error) {
      console.log("Error updating page", error);
    }
  };

  return (
    <>
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
        </label>
        <button type="submit">Edit</button>
        <button type="button" onClick={() => props.setIsEditing(false)}>Cancel</button>
      </form>
    </>
  );
};

export default EditPage;