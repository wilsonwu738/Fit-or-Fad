import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";
import { signup, clearSessionErrors } from "../../store/session";
import Video from "../Video/Video";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      image,
    };

    dispatch(signup(user));
  };

  const updateFile = (e) => setImage(e.target.files[0]);

  return (
    <>
      <br></br>
      <div className="session-form-page">
        <div className="session-form-container">
          <form className="session-form" onSubmit={handleSubmit}>
            <h2>Sign Up Here 👇</h2>
            <hr></hr>
            <div className="errors-container">
              <div className="errors">{errors?.email}</div>
            </div>

            <label className="input-field">
              <div className="input-content input-title">Email</div>
              <br></br>
              <input
                className="input-content input-credentials"
                type="text"
                value={email}
                onChange={update("email")}
                placeholder="Email"
              />
            </label>
            <div className="errors">{errors?.username}</div>

            <label className="input-field">
              <div className="input-content input-title">Username</div>
              <br></br>
              <input
                type="text"
                className="input-content input-credentials"
                value={username}
                onChange={update("username")}
                placeholder="Username"
              />
            </label>
            <div className="errors-container">
              <div className="errors">{errors?.password}</div>
            </div>

            <label className="input-field">
              <div className="input-content input-title">Password</div>
              <br></br>
              <input
                type="password"
                className="input-content input-credentials"
                value={password}
                onChange={update("password")}
                placeholder="Password"
              />
            </label>
            <div className="errors">
              {password !== password2 && "Confirm Password field must match"}
            </div>
            <label className="input-field">
              <div className="input-content input-title" >Confirm Password</div>
              <br></br>
              <input
                className="input-content input-credentials"
                type="password"
                value={password2}
                onChange={update("password2")}
                placeholder="Confirm Password"
              />
            </label>
            <label className="custom-file-input">
            Upload your profile image 
              <input
                id="signupImage"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={updateFile}
              />
            </label>
            <div id="signup">
              <input
                className="submit-buttons"

                type="submit"
                value="Sign Up"
                disabled={
                  !email || !username || !password || password !== password2
                }
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
