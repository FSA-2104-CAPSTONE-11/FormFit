import React from "react";
import { useSelector } from "react-redux";
import NavbarOffset from './NavbarOffset';

const Profile = () => {
    const auth = useSelector((state) => state.auth);
    const { username, email } = auth;
  
    return (
      <div>
        <NavbarOffset />
        <h3>Username: {username}</h3>
        <h3>Email: {email}</h3>
      </div>
    );
  };
  
  export default Profile;
