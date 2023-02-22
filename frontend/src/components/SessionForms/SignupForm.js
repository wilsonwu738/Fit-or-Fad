import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState(null);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      image
    };

    dispatch(signup(user));
  }

  const updateFile = e => setImage(e.target.files[0]);

  return (
    <>
      <br></br>
    <div className="session-form-page">
      <div className="session-form-container">
        <form className="session-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="errors">{errors?.email}</div>
          <label>
            <div >Email</div>
            <input id="input" type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.username}</div>
          <label>
            <div>Username</div>
            <input type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <div>Password</div>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <div className="errors">
            {password !== password2 && 'Confirm Password field must match'}
          </div>
          <label>
            <div>Confirm Password</div>

            <input type="password"
              value={password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
            />
          </label>
            <div></div>
            <br></br>
            <div>Upload your profile image</div>
              <label className="custom-file-input">
                Choose File
                <input id="signupImage" type="file" accept=".jpg, .jpeg, .png" onChange={updateFile} />
              </label>
          <div id="signup">
          <input
            type="submit"
            value="Sign Up"
            disabled={!email || !username || !password || password !== password2}
          />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default SignupForm;