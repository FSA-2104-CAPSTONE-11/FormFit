import React from "react";
import { useSelector } from "react-redux";
import NavbarOffset from './NavbarOffset';

const Profile = () => {
    const state = useSelector((state) => state);
  
    return (
      <div>
        <NavbarOffset />
        <h3>Username: {state.auth.username}</h3>
        <h3>Email: {state.auth.email}</h3>
      </div>
    );
  };
  
  export default Profile;