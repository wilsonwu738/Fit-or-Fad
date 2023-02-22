import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import { getCurrentUser } from './store/session';
import Video from './components/Video/Video';
import ShowPage from './components/Pages/ShowPage';
import IndexPage from './components/Pages/IndexPage';

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
        <AuthRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/show/:pageId" component={ShowPage} />
        <ProtectedRoute exact path="/index" component={IndexPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </>
  );
}

export default App;