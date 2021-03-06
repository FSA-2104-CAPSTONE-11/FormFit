import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import React, {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import {IconButton, makeStyles} from "@material-ui/core";
import StartButton from "./StartButton";
import evaluateExercise from "./Evaluator";
import Instructions from "./Instructions";
import NotLoggedIn from "./NotLoggedIn";
import {Redirect} from "react-router";
import {getPose} from "../store/pose";
import {useDispatch, useSelector} from "react-redux";
import {createPose} from "../store/poseSession";
import ExerciseSelector from "./ExerciseSelector";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  roundButton: {
    backgroundColor: "#FFC2B4",
    border: "2px solid #156064",
    opacity: "0.5",
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
  loading: {
    display: "flex",
    color: "white",
  },
  Button: {
    display: "flex",
    cursor: "pointer",
    position: "fixed",
    zIndex: 10,
    objectFit: "cover",
    height: "80px",
    width: "80px",
    top: "85%",
    left: "calc(50% - 40px)",
    padding: "0px",
  },
  countDown: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 10,
    objectFit: "cover",
    color: "white",
    opacity: "0.9",
    marginTop: "20%",
  },
}));

const Detector = () => {
  const classes = useStyles();
  const startButton = clsx(classes.roundButton, classes.Button);
  const [angleArray, setAngleArray] = useState([]);

  const isLoggedIn = useSelector((state) => !!state.auth.id);

  const webcamRef = useRef();
  const canvasRef = useRef();

  const dispatch = useDispatch();

  let summaryOfScores = {};
  let time, maxTime;
  let noseHeight = 0;
  let status = "counted";
  let reps = 0;
  let goodReps = 0;
  let results = [];

  let [finished, setFinished] = useState(false);
  let [ticker, setTicker] = useState();
  let [exercise, setExercise] = useState("Squat");

  const {criteria, instructions} = useSelector((state) => state.pose);

  const [openInstructions, setOpenInstructions] = useState(true);
  const [detector, setDetector] = useState();

  async function init() {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    setDetector(detector);
  }

  useEffect(() => {
    init();
    return () => {
      init();
    };
  }, []);

  useEffect(() => {
    async function getPoseInfoAndCriteria() {
      await dispatch(getPose({poseName: exercise}));
    }
    getPoseInfoAndCriteria();
  }, [exercise]);

  useEffect(() => {
    if (criteria) {
      setOpenInstructions(true);
    }
  }, [criteria]);

  async function getPoses() {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video properties
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      if (detector) {
        let poses = await detector.estimatePoses(video);
        if (time === maxTime) {
          // poses[0].keypoints[0].y refers to the y coordinate of the nose keypoint
          noseHeight = poses[0].keypoints[0].y;
        }

        if (
          status === "counted" &&
          poses[0].keypoints[0].y > noseHeight + 100
        ) {
          status = "bottom";
        }

        if (status === "bottom" && poses[0].keypoints[0].y < noseHeight + 100) {
          status = "rising";
        }

        if (status === "rising" && poses[0].keypoints[0].y < noseHeight + 30) {
          status = "counted";
          reps++;
          const result = await evaluateExercise(angleArray, criteria);
          let isThisRepGood = 0;
          Object.keys(result).forEach((angle) => {
            if (result[angle] && summaryOfScores[angle]) {
              summaryOfScores[angle]++;
              isThisRepGood++;
            } else if (result[angle]) {
              summaryOfScores[angle] = 1;
              isThisRepGood++;
            } else if (!summaryOfScores[angle]) {
              summaryOfScores[angle] = 0;
            }
          });
          if (isThisRepGood > 1) goodReps++;
          summaryOfScores.reps = reps;
          results.push(result);
        }

        if (time > 0) {
          requestAnimationFrame(async () => {
            await getPoses();
          });
          drawCanvas(poses, videoWidth, videoHeight, canvasRef);
        }
        if (time === 0) {
          const ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

          dispatch(createPose({results, summaryOfScores, goodReps}));
          setFinished(true);
          noseHeight = 0;
        }
      }
    }
  }

  function detectorTimer() {
    let timer = setInterval(function () {
      if (time === 16) {
        setTicker("GO!");
      } else if (time <= 15) {
        setTicker(time);
      } else if (time === 0) {
        clearInterval(timer);
      }
      time -= 1;
    }, 1000);
  }

  function handleClick() {
    setFinished(false);
    time = 16;
    maxTime = time;
    setAngleArray([]);
    requestAnimationFrame(async () => {
      await getPoses();
    });
    detectorTimer();
  }

  function countDown() {
    let count = 5;
    let timer = setInterval(function () {
      if (count > 0) {
        setTicker(count);
        count -= 1;
      } else if (count === 0) {
        setTicker("Ready... Set...");
        count -= 1;
      } else {
        clearInterval(timer);
        handleClick();
      }
    }, 1000);
  }

  function drawKeypoint(keypoint) {
    const ctx = canvasRef.current.getContext("2d");
    // If score is null, just show the keypoint.
    const confidence = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = 0.3 || 0;

    if (confidence >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
      ctx.fill(circle);
      ctx.stroke(circle);
    }
  }

  function drawKeypoints(keypoints) {
    const ctx = canvasRef.current.getContext("2d");
    const keypointInd = poseDetection.util.getKeypointIndexBySide("MoveNet");
    ctx.fillStyle = "White";
    ctx.strokeStyle = "White";
    ctx.lineWidth = 2;

    //middle points will be white (just nose)
    for (const i of keypointInd.middle) {
      drawKeypoint(keypoints[i]);
    }
    //left points will be green... note your actual left side (technically right side when looking at video)
    ctx.fillStyle = "Green";
    for (const i of keypointInd.left) {
      drawKeypoint(keypoints[i]);
    }
    //right points will be orange... note your actual right side (technically left side when looking at video)
    ctx.fillStyle = "Orange";
    for (const i of keypointInd.right) {
      drawKeypoint(keypoints[i]);
    }
  }

  function drawSkeleton(keypoints) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "White";
    ctx.strokeStyle = "White";
    ctx.lineWidth = 2;

    poseDetection.util.getAdjacentPairs("MoveNet").forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];
      const firstX = kp1.x;
      const firstY = kp1.y;
      const secondX = kp2.x;
      const secondY = kp2.y;
      const name = kp1.name + kp2.name;
      const adjacentPairAngle = Math.abs(
        (Math.atan((firstY - secondY) / (firstX - secondX)) * 180) / Math.PI
      );

      if (kp1.score > 0.5 && kp2.score > 0.5) {
        angleArray.push({[name]: [adjacentPairAngle, kp1.score, kp2.score]});
      }

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;
      const scoreThreshold = 0.2;

      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
  }

  function drawCanvas(poses, videoWidth, videoHeight, canvas) {
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(poses[0].keypoints);
    drawSkeleton(poses[0].keypoints);
  }

  function handleChange(newExercise) {
    setExercise(newExercise);
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div>
            <div>
              <Webcam
                id="webcam"
                ref={webcamRef}
                style={{
                  transform: "scaleX(-1)",
                  filter: "FlipH",
                  position: "fixed",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <canvas
                id="canvas"
                ref={canvasRef}
                style={{
                  transform: "scaleX(-1)",
                  filter: "FlipH",
                  position: "fixed",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <ExerciseSelector
                exercise={exercise}
                changeMe={(newExercise) => handleChange(newExercise)}
              />
              {openInstructions ? (
                <Instructions
                  instructions={instructions}
                  openStatus={openInstructions}
                  closeMe={() => setOpenInstructions(false)}
                />
              ) : (
                <div></div>
              )}
            </div>
            {finished ? <Redirect to="/summary" /> : <div></div>}
            <div>
              <div id="ticker" className={classes.countDown}>
                <Typography component="h2" variant="h1">
                  {ticker}
                </Typography>
              </div>
            </div>
          </div>
          {detector ? (
            <IconButton
              className={startButton}
              id="start"
              type="button"
              onClick={() => countDown()}
            >
              <StartButton />
            </IconButton>
          ) : (
            <div className={classes.Button}>
              <CircularProgress
                className={classes.loading}
                style={{margin: "auto"}}
              />
            </div>
          )}
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Detector;
