import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPageItem from './MainPageItem';
import { fetchPages } from '../../store/pages';
import { Link } from 'react-router-dom';
import './MainPageIndex.css';

const MainPageIndex = () => {
  const dispatch = useDispatch();
  // debugger
  useEffect(() => {
    dispatch(fetchPages())
  }, [dispatch]);
  
  const pages = useSelector(state => Object.values(state.pages));
  console.log(pages)

  const pageItems = pages.map((page, i) => <MainPageItem key={i} page={page} />)

  
    return (
      <>
        {pageItems}
        <Link to="/newpage">
            <button id="createPageButton">Create a New Page</button>
        </Link>
      </>
    );
  }
  
  export default MainPageIndex;