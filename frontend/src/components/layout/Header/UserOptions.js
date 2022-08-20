import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';

import { SpeedDial, SpeedDialAction } from '@mui/material';
import { logOut } from '../../../reduxFeature/features/User/userSlice';

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];
  if (user.role === 'admin') {
    options.unshift({
      icon: <DashboardIcon />,
      name: 'Dashboard',
      func: dashboard,
    });
  }
  function dashboard() {
    navigate('/dashboard');
  }
  function orders() {
    navigate('/orders');
  }
  function account() {
    navigate('/profile');
  }
  function logoutUser() {
    dispatch(logOut());
    navigate('/');
    alert('Logut Succesfully');
  }

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial tooltip expampe"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.userImage.url ? user.userImage.url : '/Profile.png'}
            alt="Profile"
          />
        }
      >
        {' '}
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            key={item.name}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
