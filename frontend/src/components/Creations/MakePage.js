import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { composePage } from '../../store/pages';
import { useSelector } from 'react-redux';
import './MakePage.css'

const MakePage = () => {
   
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    items: [{ name: '', url: '' }],
});

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composePage(formData));
    setFormData({
      author: currentUser._id,
      title: '',
      description: '',
      imageUrl: '',
      items: [{ name: '', url: '' }],
      likes: ''
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleItemChange = (e, groupIdx, itemIdx) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const itemGroups = [...prevFormData.itemGroups];
      const items = [...itemGroups[groupIdx].items];
      items[itemIdx] = {
        ...items[itemIdx],
        [name]: value,
      };
      itemGroups[groupIdx] = {
        ...itemGroups[groupIdx],
        items,
      };
      return {
        ...prevFormData,
        itemGroups,
      };
    });
  };

  const handleAddItem = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      items: [
        ...prevFormData.items,
        { name: '', url: '' },
      ],
    }));
  };

  const handleRemoveItem = idx => {
    setFormData(prevFormData => ({
      ...prevFormData,
      items: prevFormData.items.filter((item, i) => i !== idx),
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <label htmlFor="imageUrl">Image URL</label>
      <input type="file" accept=".jpg, .jpeg, .png" value={formData.imageUrl} onChange={handleChange} />

      {formData.items.map((item, idx) => (
        <div key={idx}>
          <label htmlFor={`itemName${idx}`}>Item Name</label>
          <input
            type="text"
            id={`itemName${idx}`}
            name={`items.${idx}.name`}
            value={item.name}
            onChange={e => handleItemChange(e, idx)}
          />

          <label htmlFor={`itemUrl${idx}`}>Item URL</label>
          <input
            type="text"
            id={`itemUrl${idx}`}
            name={`items.${idx}.url`}
            value={item.url}
            onChange={e => handleItemChange(e, idx)}
          />

          <button type="button" onClick={() => handleRemoveItem(idx)}>
            Remove Item
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddItem}>
        Add Item
      </button> <br/>

      <button type="submit">Create Page</button>
    </form>
  );
}

export default MakePage;