import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Profile.css';
import Loading from '../layout/Loader/Loading';
import MetaData from '../layout/MetaData';

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${user.user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.user.userImage.url} alt={user.user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
