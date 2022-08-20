import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UpdatePassword.css';

import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {
  reset,
  updatePassword,
} from '../../reduxFeature/features/User/userSlice';
import Loading from '../layout/Loader/Loading';

const UpdatePassword = () => {
  const [oldPass, setOldPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [newPass, setNewPass] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isUpdated, message } = useSelector(
    (state) => state.auth
  );
  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('oldPassword', oldPass);
    myForm.set('newPassword', newPass);
    myForm.set('confirmPassword', passConfirm);
    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isUpdated) {
      toast.success('password updated successfully');
      navigate('/profile');
      dispatch(reset());
    }
  }, [isError, message, isUpdated, navigate, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Change Password</h2>
              <form className="updatePassForm" onSubmit={updateSubmit}>
                <div className="updatePassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old passowrd"
                    required
                    name="password"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                  />
                </div>
                <div className="registerPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="New passowrd"
                    required
                    name="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </div>
                <div className="registerPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm new passowrd"
                    required
                    name="password"
                    value={passConfirm}
                    onChange={(e) => setPassConfirm(e.target.value)}
                  />
                </div>

                <input type="submit" value="Update" className="updateBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
