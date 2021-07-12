import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../store/poseHistory";
import NavbarOffset from "./NavbarOffset";

const SessionSummary = (props) => {
  if (props) console.log("props", props.location.state);

  return <h1>Some summary this is!</h1>;
};

export default SessionSummary;
