import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
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
    width: "80%",
  },
}));

export default function Scoreboard({openStatus, scoreProp}) {
  const classes = useStyles();
  const [open, setOpen] = useState(openStatus);

  const handleClose = () => {
    setOpen(false);
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
            <Typography className={classes.title}>Score</Typography>
            <table
              style={{
                objectFit: "cover",
                borderWidth: "1px",
                borderColor: "#",
                borderStyle: "solid",
                borderRadius: "4px",
              }}
            >
              <thead>
                <tr>
                  <th>Body Part</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(scoreProp).map((criterion, index) => {
                  return (
                    <tr key={index + "row"}>
                      <td key={index}>{criterion}</td>
                      <td key={index + "k"}>{`${scoreProp[criterion]}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    style={{
                      backgroundColor: "#FFC2B4",
                    }}
                    onClick={() => {
                      handleClose();
                      console.log("submitted!");
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "red",
                    }}
                    className={classes.button}
                    onClick={handleClose}
                  >
                    Discard
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
