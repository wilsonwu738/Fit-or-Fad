import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPage } from "../../store/pages";

const EditPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [title, setTitle] = useState(props.page.title);
  // const [imageUrl, setImageUrl] = useState(props.page.imageUrl);
  const page = useSelector((state) => state.pages);
  const [title, setTitle] = useState(page.title);
  const [imageUrl, setImageUrl] = useState(page.imageUrl);

  

  useEffect(() => {
    setTitle(page.title);
    setImageUrl(page.imageUrl);
  }, [page]);

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
      history.push(`/show/${props.page._id}`);
    } catch (error) { 
      
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