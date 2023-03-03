import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { login, clearSessionErrors } from '../../store/session';
import Video from '../Video/Video';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <>
        <br></br>
    <div className="session-form-page">
      <div className="session-form-container">
      
        <form className="session-form" onSubmit={handleSubmit}>
            <h2>Log In Here 👇 </h2>
          <hr></hr>
          <div className="errors">{errors?.email}</div>
          <label>
            <div>Email</div>
            <br></br>
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <div>Password</div>
              <br></br>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <br></br>
          <br></br>
          <div id="signup">
          <input
            type="submit"
            value="Log In"
            disabled={!email || !password}
          />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default LoginForm;