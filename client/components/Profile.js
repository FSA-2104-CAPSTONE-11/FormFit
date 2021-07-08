import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import NavbarOffset from "./NavbarOffset";
import {getUser, updateUser} from "../store/user";

const Profile = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const {id} = useSelector((state) => state.auth);
  const {username, email} = useSelector((state) => state.user);
  let [editing, setEditing] = useState(false);
  let newUsername = username;
  let newEmail = email;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser(id));
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

  const onUsernameChange = (event) => {
    newUsername = event.target.value;
  };

  const onEmailChange = (event) => {
    newEmail = event.target.value;
  };

  return (
    <div>
      <NavbarOffset />
      {isLoggedIn ? (
        <div>
          <h2>Personal Info:</h2>
          {!editing ? (
            <div>
              <h3>Username: {username}</h3>
              <h3>Email: {email}</h3>
              <button
                onClick={() => {
                  setEditing((editing = true));
                }}
                style={{textDecorationLine: "underline"}}
              >
                Edit
              </button>
            </div>
          ) : (
            <div>
              <h3>
                Username:
                <input
                  type="text"
                  name="newUsername"
                  defaultValue={username}
                  onChange={onUsernameChange}
                />
              </h3>
              <h3>
                Email:
                <input
                  type="text"
                  name="email"
                  defaultValue={email}
                  onChange={onEmailChange}
                />
              </h3>
              <button
                onClick={() => {
                  dispatch(updateUser({id, newUsername, newEmail}));
                  setEditing((editing = false));
                }}
                style={{textDecorationLine: "underline"}}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing((editing = false));
                }}
                style={{textDecorationLine: "underline"}}
              >
                Cancel
              </button>
            </div>
          )}
          <h2>My Activity:</h2>
          <h3>Date of last exercise: </h3>
          <h3>Score of last exercise: </h3>
        </div>
      ) : (
        <h3>Please log in to view this page!</h3>
      )}
    </div>
  );
};

export default Profile;
