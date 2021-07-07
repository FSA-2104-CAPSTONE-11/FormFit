import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Camera from "./components/Camera";

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  const loadInitialData = () => {
    dispatch(me());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <AuthForm name="login" />
        </Route>
        <Route path="/signup">
          <AuthForm name="signup" />
        </Route>
        <Route exact path="/camera">
          <Camera />
        </Route>
      </Switch>
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
