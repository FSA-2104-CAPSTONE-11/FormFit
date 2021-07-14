import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Slide,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #156064",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    opacity: ".75",
    minWidth: 300,
    width: "40%",
  },
  title: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    fontWeight: "bolder",
    variant: "h2",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    color: "black",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    width: "25%",
  },
}));

export default function Instructions({ instructions, openStatus, closeMe }) {
  const classes = useStyles();
  const [open, setOpen] = useState(openStatus);

  const handleClose = () => {
    setOpen(false);
    closeMe();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open} direction="left">
          <div className={classes.paper}>
            <Typography className={classes.title}>Instructions</Typography>
            <Typography>{instructions}</Typography>
            <div className={classes.root}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#ADD8E6",
                }}
                className={classes.button}
                onClick={handleClose}
              >
                Got it!
              </Button>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
