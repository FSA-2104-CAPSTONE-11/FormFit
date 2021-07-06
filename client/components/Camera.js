import React, { useEffect, useRef } from "react";
import history from "../history";
import Webcam from "react-webcam";

let count = 100;
let angleArray = [];
let kneeScore = 0;
let hipScore = 0;

const Camera = () => {
  const webcamRef = useRef();
  const canvasRef = useRef();

  async function init() {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const interval = setInterval(() => {
      getPoses(detector);
      count--;
      const ticker = document.getElementById("ticker");
      ticker.innerText = count;
      if (count === 0) {
        count = 100;
        clearInterval(interval);
        checkKneeAngle();
        checkHipAngle();
        angleArray = [];
        kneeScore = 0;
        hipScore = 0;
      }
    }, 16);
  }

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

      let poses = await detector.estimatePoses(video);
      console.log("poses", poses);
      drawCanvas(poses, videoWidth, videoHeight, canvasRef);
    }
  }

  function drawKeypoint(keypoint) {
    const ctx = canvasRef.current.getContext("2d");
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = 0.3 || 0;

    if (score >= scoreThreshold) {
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
        angleArray.push({ [name]: adjacentPairAngle });
      }
      // console.log(angleArray);
      // console.log("ADJACENT & ANGLE:", kp1.name, kp2.name, adjacentPairAngle);

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

  function handleClick() {
    init();
    document.getElementById("ticker").innerText = "LOADING";
    document.getElementById("kneeScore").innerText = "";
    document.getElementById("hipScore").innerText = "";
  }

  function checkKneeAngle() {
    const kneeAngles = angleArray.filter((e) =>
      Object.keys(e).includes("right_hipright_knee")
    );
    kneeAngles.map((e) => {
      if (e.right_hipright_knee < 5) {
        kneeScore++;
      }
    });
    // console.log(score);
    if (kneeScore > 0) {
      document.getElementById("kneeScore").innerText = "✔";
    }
  }

  function checkHipAngle() {
    const hipAngles = angleArray.filter((e) =>
      Object.keys(e).includes("right_shoulderright_hip")
    );
    hipAngles.map((e) => {
      if (e.right_shoulderright_hip < 45) {
        hipScore++;
      }
    });
    // console.log(score);
    if (hipScore === 0) {
      document.getElementById("hipScore").innerText = "✔";
    }
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => handleClick()}>
          Start
        </button>
        <Webcam
          id="webcam"
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>
      <div>Timer:</div>
      <div id="ticker"></div>
      <table
        style={{
          borderWidth: "1px",
          borderColor: "#aaaaaa",
          borderStyle: "solid",
        }}
      >
        <thead>
          <tr>
            <th>Body Part</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Torso stays Upright:</td>
            <td id="hipScore"></td>
          </tr>
          <tr>
            <td>Knee reaches 90°:</td>
            <td id="kneeScore"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Camera;
