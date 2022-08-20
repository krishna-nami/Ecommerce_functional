import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import {
  update,
  loadUser,
  reset,
} from '../../reduxFeature/features/User/userSlice';
import Loading from '../layout/Loader/Loading';

const UpdateProfile = () => {
  const { user, isUpdated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    user ? user.user.userImage.url : '/Profile.png'
  );
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('avatar', avatar);

    // const myForm = {
    //   name,
    //   email,
    //   password,
    //   avatar,
    // };

    dispatch(update(myForm));
  };
  const updateDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (isUpdated) {
      alert('user updated successfully');
      dispatch(loadUser());
      navigate('/profile');
    }
  }, [dispatch, isUpdated, navigate]);

  return (
    <>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2>Update Profile</h2>
          <form
            encType="multipart/form-data"
            className="updateForm"
            onSubmit={updateSubmit}
          >
            <div className="updateName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="updateImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateDataChange}
              />
            </div>
            <input type="submit" value="Update" className="updateBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
