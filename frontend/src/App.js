import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPageIndex from './components/MainPage/MainPageIndex';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import CurrentUserProfile from './components/Profile/CurrentUserProfile';
// import UserProfile from './components/Profile/UserProfile';
import { getCurrentUser } from './store/session';
import Video from './components/Video/Video';
import ShowPage from './components/Pages/ShowPage';
import IndexPage from './components/Pages/IndexPage';
import MakePage from './components/Creations/MakePage';
import EditPage from './components/Edit/EditPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
     
      <NavBar />
      <Video />
      <Switch>
        <ProtectedRoute exact path="/" component={MainPageIndex} />
        <ProtectedRoute exact path="/show/:pageId" component={ShowPage} />
        <ProtectedRoute exact path="/index" component={IndexPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/currentprofile" component={CurrentUserProfile} />
        <ProtectedRoute exact path="/newpage" component={MakePage} />
        <ProtectedRoute exact path="/editpage" component={EditPage}/>
      </Switch>
    </>
  );
}

export default App;