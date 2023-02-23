import React from 'react';
import './MainPageItem.css';
import { useHistory } from 'react-router-dom';


const MainPageItem = (props) => {
    const history = useHistory(); 
    const handleClick = () => {
        history.push({ // use push method to navigate to EditPage component with prop as parameter
          pathname: '/editpage',
          state: { page: props.page }
        });
      };
      return (
        <>
          <div>{props.page.title}</div>
          <img src={props.page.imageUrl} alt={""}></img>
          <div>Likes: {props.page.liker}</div>
          <button id="editPageButton" onClick={handleClick}>Edit</button>
        </>
      );
 };


export default MainPageItem;