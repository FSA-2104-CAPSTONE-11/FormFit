import React, {useEffect, useRef} from "react";
import Webcam from "react-webcam";
import * as posenet from "@tensorflow-models/posenet";

// let detector;
// let poses;
const color = "aqua";
const lineWidth = 2;

const Camera = () => {
  const webcamRef = useRef();
  const canvasRef = useRef();

  async function init() {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    setInterval(() => {
      getPoses(detector);
    }, 50);
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

  // function toTuple({ y, x }) {
  //   return [y, x];
  // }

  // function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  //   ctx.beginPath();
  //   ctx.moveTo(ax * scale, ay * scale);
  //   ctx.lineTo(bx * scale, by * scale);
  //   ctx.lineWidth = lineWidth;
  //   ctx.strokeStyle = color;
  //   ctx.stroke();
  // }

  // function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  //   const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
  //     keypoints,
  //     minConfidence
  //   );
  //   adjacentKeyPoints.forEach((keypoints) => {
  //     drawSegment(
  //       toTuple(keypoints[0]),
  //       toTuple(keypoints[1]),
  //       color,
  //       scale,
  //       ctx
  //     );
  //   });
  // }

  // function drawPoint(ctx, y, x, r, color) {
  //   ctx.beginPath();
  //   ctx.arc(x, y, r, 0, 2 * Math.PI);
  //   ctx.fillStyle = color;
  //   ctx.fill();
  // }

  // function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  //   for (let i = 0; i < keypoints.length; i++) {
  //     const keypoint = keypoints[i];
  //     if (keypoint.score < minConfidence) {
  //       continue;
  //     }

  //     const { y, x } = keypoint;
  //     drawPoint(ctx, y * scale, x * scale, 3, "white");
  //   }
  // }
  
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

    for (const i of keypointInd.middle) {
      drawKeypoint(keypoints[i]);
    }

    ctx.fillStyle = "Green";
    for (const i of keypointInd.left) {
      drawKeypoint(keypoints[i]);
    }

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
    // const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(poses[0].keypoints);
    drawSkeleton(poses[0].keypoints);
  }

  // let count = 0;
  // setInterval(function () {
  //   while (count < 1000) {
  //     getPoses();
  //     count++;
  //   }
  //   if (count === 1000) {
  //     const canvas = document.getElementById("canvas");
  //     const ctx = canvas.getContext("2d");
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   }
  // }, 1000);

  function handleClick() {
    init();
  }

  return (
    <div>
      <button type="button" onClick={() => handleClick()}>
        Start
      </button>
      <Webcam
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
  );
};

export default Camera;
