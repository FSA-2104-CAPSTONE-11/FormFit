import React from "react";
import { useSelector } from "react-redux";
import NavbarOffset from './NavbarOffset';

/**
 * COMPONENT
 */
 export const Home = () => {
  const username = useSelector((state) => state.auth.username);

  return (
    <div>
      <NavbarOffset />
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default Home;
