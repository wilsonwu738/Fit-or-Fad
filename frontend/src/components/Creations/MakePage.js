import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearPageErrors, composePage } from '../../store/pages';
import { useRef } from 'react';
import './MakePage.css'



function MakePage () {
  const [data, setData] = useState({
    author: '',
    title: '',
    description: '',
    items: [{ name: '', url: '' }],
    likes: ''
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  // const errors = useSelector(state => state.errors.pages);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    return () => dispatch(clearPageErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
  
    const items = data.items.map(item => ({
      name: item.name,
      url: item.url
    }));
  
    const finalData = {
      author: currentUser._id,
      title: data.title,
      description: data.description,
      items: JSON.stringify(items),
      likes: ""
    };
  
    dispatch(composePage(finalData, images))
      .then(() => {
        history.push('/');
      })
      .catch((err) => console.log(err));
  
    setImages([]);
    setImageUrls([]);
    setData({
      author: '',
      title: '',
      description: '',
      items: [{ name: '', url: '' }],
      likes: ''
    });
    fileRef.current.value = null;
  };

  const updateFiles = async e => {
    const files = e.target.files;
    setImages(files);
    if (files.length !== 0) {
      let filesLoaded = 0;
      const urls = [];
      Array.from(files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          urls[index] = fileReader.result;
          if (++filesLoaded === files.length) 
            setImageUrls(urls);
        }
      });
    }
    else setImageUrls([]);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevFormData => ({
      ...prevFormData,
      [name]: name === "items" ? JSON.stringify(value) : value || '',
    }));
  };

  const handleItemChange = (e, itemIdx, itemKey) => {
    const { value } = e.target;
    setData((prevFormData) => {
      const items = [...prevFormData.items];
      items[itemIdx] = {
        ...items[itemIdx],
        [itemKey]: value,
      };
      return {
        ...prevFormData,
        items,
      };
    });
  };

  const handleAddItem = () => {
    setData(prevFormData => ({
      ...prevFormData,
      items: [
        ...prevFormData.items,
        { name: '', url: '' },
      ],
    }));
  };

  const handleRemoveItem = idx => {
    setData(prevFormData => ({
      ...prevFormData,
      items: prevFormData.items.filter((item, i) => i !== idx),
    }));
  };

  const update = e => setData(e.currentTarget.value);


  return (
    <>
      <div id="makepageform">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            className="input-text-and-file"
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
  
          <label htmlFor="description">Description</label>
          <input
          className="input-text-and-file"
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          <br />
  
          <label>
            Images to Upload
            <input
            className="input-text-and-file"
              id ="upload"
              type="file"
              ref={fileRef}
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={updateFiles}
            />
          </label>
  
          {imageUrls.length > 0 && (
            <div>
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  style={{ width: "200px", height: "auto" }}
                />
              ))}
            </div>
          )}
  
        {data.items.map((item, idx) => (
        <div key={idx}>
          <label htmlFor={`itemName${idx}`}>Item Name</label>
          <input
          className="input-text-and-file"
            type="text"
            id={`itemName${idx}`}
            name={`items[${idx}][name]`}
            value={item.name}
            onChange={(e) => handleItemChange(e, idx, "name")}
          />

          <label htmlFor={`itemUrl${idx}`}>Item URL</label>
          <input
          className="input-text-and-file"
            type="text"
            id={`itemUrl${idx}`}
            name={`items[${idx}][url]`}
            value={item.url}
            onChange={(e) => handleItemChange(e, idx, "url")}
          />
          <br />
          <br />
          <div>
            <button
              id="makebutton"
              type="button"
              onClick={() => handleRemoveItem(idx)}
            >
              Remove Item
            </button>
          </div>
        </div>
      ))}
      <button id="makebutton" type="button" onClick={handleAddItem}>
        Add Item
      </button>
      <br></br>
  
          <button id="subz" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default MakePage;