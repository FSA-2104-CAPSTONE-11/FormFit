import React from "react";
import { makeStyles } from "@material-ui/core";
import { FormControl, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  dropdownStyle: {
    boxShadow: "none",
    backgroundColor: "#ffffff",
  },
  menuItemStyle: {
    display: "block",
  },
}));

function ExerciseSelector({ exercise, changeMe }) {
  const classes = useStyles();

  function handleChange(event) {
    changeMe(event.target.value);
  }

  return (
    <form className={classes.root}>
      <FormControl className={classes.formControl}>
        <div className={classes.formControl}>
          <Select
            value={exercise}
            onChange={handleChange}
            style={{
              position: "fixed",
              zIndex: 10,
              marginLeft: 40,
              marginTop: 50,
              color: "black",
              fontWeight: "bolder",
              backgroundColor: "white",
            }}
            MenuProps={{
              classes: { paper: classes.dropdownStyle },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem className={classes.menuItemStyle} value="Squat">
              Squat
            </MenuItem>
            <MenuItem className={classes.menuItemStyle} value="Push-Up">
              Push-Up
            </MenuItem>
            <MenuItem className={classes.menuItemStyle} value="Sit-Up">
              Sit-Up
            </MenuItem>
          </Select>
        </div>
      </FormControl>
    </form>
  );
}

export default ExerciseSelector;
