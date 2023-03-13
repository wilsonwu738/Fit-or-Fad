import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPage } from "../../store/pages";
import { useRef } from "react";
import "./EditPage.css";

const EditPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [title, setTitle] = useState(props.page.title);
  // const [imageUrl, setImageUrl] = useState(props.page.imageUrl);
  const page = useSelector((state) => state.pages);
  const [title, setTitle] = useState(page.title);
  const [imageUrl, setImageUrl] = useState(page.imageUrl);
  const [description, setDescription] = useState(page.description);
  const fileRef = useRef(null);

  useEffect(() => {
    setTitle(page.title);
    setImageUrl(page.imageUrl);
    setDescription(page.description);
  }, [page]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedPage = { ...props.page, title, imageUrl, description };
      await dispatch(editPage(updatedPage));
      props.setIsEditing(false);
      history.push(`/show/${props.page._id}`);
    } catch (error) {}
  };

  return (
    <>
      <form id="edit-form" onSubmit={handleSubmit}>
        <h2 id="edityour">Edit Your Page ✎</h2>
        <label id="form-label">
          Title
          <input
            type="text"
            name="title"
            className="form-input"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <label id="form-label">
          Image URL
          <input
            type="text"
            name="imageUrl"
            className="form-input"
            onChange={handleImageUrlChange}
          />
        </label>
        <label id="form-label">
          Description
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            style={{ width: "100%", height: "auto", overflow: "auto" }}
          />
        </label>

        <button type="submit" id="submit-button">
          Done
        </button>
        <button
          type="button"
          id="form-cancel"
          onClick={() => props.setIsEditing(false)}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default EditPage;
