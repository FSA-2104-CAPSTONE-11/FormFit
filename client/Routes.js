import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Detector from "./components/Detector";
import Profile from "./components/Profile";
import History from "./components/PoseHistory";
import SessionSummary from "./components/SessionSummary";
import Leaderboard from "./components/Leaderboard";
import LogoLoad from "./components/LogoLoad";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();

  const loadInitialData = () => {
    dispatch(me());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames="fade">
              <Switch location={location}>
                <Route exact path="/">
                  <LogoLoad />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/login">
                  <AuthForm name="login" />
                </Route>
                <Route path="/signup">
                  <AuthForm name="signup" />
                </Route>
                <Route exact path="/detector">
                  <Detector />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/history">
                  <History />
                </Route>
                <Route
                  exact
                  path="/summary"
                  render={(props) => <SessionSummary {...props} />}
                />
                <Route exact path="/leaderboard">
                  <Leaderboard />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
