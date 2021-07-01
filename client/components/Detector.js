import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import React, { useEffect } from "react";

const Detect = async () => {
  console.log("Successfully loaded model");
  const webcamElement = document.getElementById("webcam");

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);

  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  };
  const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
  );

  const poses = await detector.estimatePoses(webcam);
  console.log(poses);
  return <div>hi</div>;
};

export default Detect;
