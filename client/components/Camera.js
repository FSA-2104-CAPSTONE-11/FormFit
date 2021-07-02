import * as p from "p5";
import React, {useEffect, useRef} from "react";
import Webcam from "react-webcam";

let detector;
let poses;
// let video;

const Camera = () => {
  const webcamRef = useRef();
  const canvasRef = useRef();
  async function init() {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    };
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
  }


  async function getPoses() {
    await init();
    console.log('hello', webcamRef)
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

        poses = await detector.estimatePoses(video);
        console.log('poses', poses);
      }
  }

//   function draw() {
//     p.background(220);
//   }

  getPoses();

  return (
    <div>
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
