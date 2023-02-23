import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPageItem from './MainPageItem';
import { fetchPages } from '../../store/pages';
import { Link } from 'react-router-dom';
import './MainPageIndex.css';
import plus from '../../images/create.png'

const MainPageIndex = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchPages())
  }, [dispatch]);

  const pages = useSelector(state => Object.values(state.pages));
  console.log(pages)

  const pageItems = pages.map((page, i) => <MainPageItem key={i} page={page} />)



  return (
    <>
      <div className="main-page-grid">

        {pageItems}
      </div>
      <div id="plus">
        <Link to="/newpage">
          <img id="git" src={plus} alt="git" />
        </Link>
      </div>
    </>
  );
}

export default MainPageIndex;
