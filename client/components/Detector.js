import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { IconButton, SvgIcon, makeStyles } from "@material-ui/core";
import StartButton from "./StartButton";
import evaluateExercise from "./Evaluator";
import Scoreboard from "./Scoreboard";
import { getPose } from "../store/pose";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  roundButton: {
    backgroundColor: "#FFC2B4",
    border: "2px solid #156064",
    opacity: "0.5",
  },
}));

const Detector = () => {
  const classes = useStyles();
  const webcamRef = useRef();
  const canvasRef = useRef();
  const dispatch = useDispatch();

  let time;
  let [score, setScore] = useState({});
  let [angleArray, setAngleArray] = useState([]);
  let [finished, setFinished] = useState(false);
  let [ticker, setTicker] = useState();
  const { criteria, instructions } = useSelector((state) => state.pose);

  async function init() {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    if (detector) {
      requestAnimationFrame(async () => {
        await getPoses(detector);
      });
    }
  }

  useEffect(() => {
    async function getPoseInfoAndCriteria() {
      await dispatch(getPose({ poseName: "pushup" }));
    }
    getPoseInfoAndCriteria();
  }, []);

  async function getPoses(detector) {
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
        //console.log("poses", poses);
        if (time > 0) {
          time--;
          setTicker(time);
          requestAnimationFrame(async () => {
            await getPoses(detector);
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
          const result = await evaluateExercise(angleArray, criteria);
          setScore(result);
          setFinished(true);
        }
      }
    }
  }

  function handleClick() {
    setTicker("LOADING");
    setFinished(false);
    setScore({});
    time = 40;
    setAngleArray([]);
    init();
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
        angleArray.push({ [name]: [adjacentPairAngle, kp1.score, kp2.score] });
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

  return (
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
        </div>
        {/* <div
          style={{
            position: "fixed",
            top: "3%",
            left: "80%",
            zIndex: 10,
            objectFit: "cover",
          }}
        >
          Timer:
        </div> */}
        {finished ? (
          <Scoreboard openStatus={true} scoreProp={score} />
        ) : (
          <div></div>
        )}
        <div
          id="ticker"
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            zIndex: 10,
            objectFit: "cover",
            backgroundColor: "white",
            opacity: "0.5",
          }}
        >
          {ticker}
        </div>
      </div>
      <IconButton
        className={classes.roundButton}
        id="start"
        type="button"
        style={{
          cursor: "pointer",
          position: "fixed",
          zIndex: 10,
          objectFit: "cover",
          height: "80px",
          width: "80px",
          top: "85%",
          left: "calc(50% - 40px)",
          padding: "0px",
        }}
        onClick={() => handleClick()}
      >
        <StartButton />
      </IconButton>
    </div>
  );
};

export default Detector;
