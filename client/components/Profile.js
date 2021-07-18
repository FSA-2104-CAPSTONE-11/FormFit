import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../store/user";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Redirect } from "react-router";
import NotLoggedIn from "./NotLoggedIn";
import bannerImage from "../../public/situp.png";
import dataImage from "../../public/dataBanner.jpg";
import NavbarOffset from "./NavbarOffset";
import history from "../history";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: 345,
  },
  paper: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    color: "black",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: 200,
    backgroundColor: "#FFC2B4",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { username, email, poseSessions } = useSelector((state) => state.user);
  let [editing, setEditing] = useState(false);
  let newUsername = username;
  let newEmail = email;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

  const onUsernameChange = (event) => {
    newUsername = event.target.value;
  };

  const onEmailChange = (event) => {
    newEmail = event.target.value;
  };

  const getFavoriteExercise = (poseSessions) => {
    if (poseSessions.length === 0) return null;
    let modeMap = {};
    let maxEl = poseSessions[0].pose.name,
      maxCount = 1;
    for (let i = 0; i < poseSessions.length; i++) {
      let el = poseSessions[i].pose && poseSessions[i].pose.name;
      if (modeMap[el] === null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  };

  const alterDate = (createdAt) => {
    const year = Number(createdAt.slice(0, 4));
    const monthIndex = createdAt.slice(5, 7) - 1;
    const day = Number(createdAt.slice(8, 10));
    const event = new Date(year, monthIndex, day);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return event.toLocaleDateString("US-en", options);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className={classes.paper}>
          <NavbarOffset />
          <Card className={classes.root}>
            <CardMedia title="Exercise Banner">
              <img src={bannerImage} style={{ width: "100%" }} />
            </CardMedia>
            {poseSessions && poseSessions.length ? (
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  My Activity:
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Favorite Exercise:</strong>{" "}
                  {getFavoriteExercise(poseSessions)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Last Exercise Date:</strong>{" "}
                  {alterDate(poseSessions[poseSessions.length - 1].createdAt)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Last Exercise Type:</strong>{" "}
                  {poseSessions[poseSessions.length - 1].pose.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Last Exercise Score:</strong>{" "}
                  {poseSessions[poseSessions.length - 1].score}
                </Typography>
                <CardActions>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      style={{left: "50%"}}
                      onClick={() => {
                        history.push("/history");
                      }}
                    >
                      View All Activity
                    </Button>
                  </div>
                </CardActions>
              </CardContent>
            ) : (
              <div></div>
            )}
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia title="User Data Banner">
                <img src={dataImage} style={{ width: "100%" }} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Personal Info:
                </Typography>
                {!editing ? (
                  <div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Username:</strong> {username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Email:</strong> {email}
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Username:</strong>{" "}
                      <input
                        type="text"
                        name="newUsername"
                        defaultValue={username}
                        onChange={onUsernameChange}
                      />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Email:</strong>{" "}
                      <input
                        type="text"
                        name="email"
                        defaultValue={email}
                        onChange={onEmailChange}
                      />
                    </Typography>
                  </div>
                )}
              </CardContent>
            </CardActionArea>
            <CardActions>
              {!editing ? (
                <Button
                  size="small"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <div style={{}}>
                  <Button
                    size="small"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(updateUser({ newUsername, newEmail }));
                      setEditing(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardActions>
          </Card>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Profile;
