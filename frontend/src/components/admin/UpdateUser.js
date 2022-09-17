import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAUser,
  updateAUser,
  reset_update,
} from '../../reduxFeature/features/User/userSlice';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SideBar from './Sidebar';
import Loading from '../layout/Loader/Loading';
import { toast } from 'react-toastify';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { aUser, isLoading, isError, message, isUpdated } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (aUser && aUser._id !== id) {
      dispatch(getAUser(id));
    } else {
      setName(aUser.name);
      setEmail(aUser.email);
      setRole(aUser.role);
    }
    if (isUpdated) {
      toast.success(message);
      dispatch(reset_update());
      navigate('/admin/users');
    }
  }, [dispatch, id, aUser, message, isUpdated, navigate]);
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('role', role);
    const payload = {
      id,
      myForm,
    };

    dispatch(updateAUser(payload));
  };
  console.log(message);
  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {isLoading ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  isLoading ? true : false || role === '' ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
