import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import MainPageIndex from "./components/MainPage/MainPageIndex";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import CurrentUserProfile from "./components/Profile/CurrentUserProfile";
import UserProfile from "./components/Profile/UserProfile";
import { getCurrentUser } from "./store/session";
import Video from "./components/Video/Video";
import ShowPage from "./components/Pages/ShowPage";
import UserIndexPage from "./components/Pages/ProfileIndexPage";
import MakePage from "./components/Creations/MakePage";
import EditPage from "./components/Edit/EditPage";
import About from "./components/About/About";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Video />
        <Switch>
          <ProtectedRoute exact path="/" component={MainPageIndex} />
          <ProtectedRoute exact path="/show/:pageId" component={ShowPage} />
          <ProtectedRoute exact path="/index" component={UserIndexPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute
            exact
            path="/currentprofile"
            component={CurrentUserProfile}
          />
          <ProtectedRoute
            exact
            path="/profile/:userId"
            component={UserProfile}
          />
          <ProtectedRoute exact path="/newpage" component={MakePage} />
          <ProtectedRoute exact path="/editpage" component={EditPage} />
          <ProtectedRoute exact path="/about" component={About} />
        </Switch>
        <Footer />
      </>
    )
  );
}

export default App;
