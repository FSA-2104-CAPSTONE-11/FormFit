import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NavbarOffset from './NavbarOffset';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const [video, setVideo] = useState();

  useEffect(() => {
    let videoElement = document.querySelector("#videoElement");
    setVideo(videoElement);
  });

  function startVideo() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!", error);
        });
    }
  }

  return (
    <div>
      <NavbarOffset />
      <h3>Welcome, {username}</h3>
      <button onClick={startVideo}>Show my face</button>
      <video autoPlay={true} id="videoElement"></video>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
