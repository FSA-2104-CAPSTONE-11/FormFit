import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store";
import { Redirect } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name } = props;
  let displayName;
  if (name === "login") {
    displayName = "Login";
  } else if (name === "signup") {
    displayName = "Sign Up";
  }
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (name === "signup") {
      const email = evt.target.email.value;
      dispatch(authenticate({ username, password, formName, email }));
    } else {
      dispatch(authenticate({ username, password, formName }));
    }
  };
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  return (
    <div>
      {isLoggedIn ? (
        <Redirect to="/home" />
      ) : (
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          {name === "signup" ? (
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="email" />
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      )}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

export default AuthForm;
