import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import { login, register } from '../../reduxFeature/features/User/userSlice';
import Loading from '../layout/Loader/Loading';

const LoginRegister = () => {
  const { isError, isLoading, message, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [aUser, setAUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = aUser;
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral');
      switcherTab.current.classList.remove('shiftToRight');

      registerTab.current.classList.remove('shiftToNeutralForm');
      loginTab.current.classList.remove('shiftToLeft');
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight');
      switcherTab.current.classList.remove('shiftToNeutral');

      registerTab.current.classList.add('shiftToNeutralForm');
      loginTab.current.classList.add('shiftToLeft');
    }
  };
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }

    if (isError) {
      alert(message);
    }
  }, [isError, message, navigate, user]);
  const loginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: loginEmail,
      password: loginPassword,
    };
    dispatch(login(userData));
    console.log(userData);
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    console.log(...myForm);
    // const myForm = {
    //   name,
    //   email,
    //   password,
    //   avatar,
    // };

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setAUser({ ...aUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="LoginRegister">
            <div className="LoginRegisterBox">
              <div>
                <div className="login_Register_Toggle">
                  <p onClick={(e) => switchTabs(e, 'login')}>Login</p>
                  <p onClick={(e) => switchTabs(e, 'register')}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form onSubmit={loginSubmit} ref={loginTab} className="loginForm">
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Please Enter your password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Login" className="loginBtn" />
                <Link to="/password/forgot">Forgot Password?</Link>
              </form>
              <form
                ref={registerTab}
                encType="multipart/form-data"
                className="registerForm"
                onSubmit={registerSubmit}
              >
                <div className="registerEmail">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="registerEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="registerPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Please enter your passowrd"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="registerBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default LoginRegister;
