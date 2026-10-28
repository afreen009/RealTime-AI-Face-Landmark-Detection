//install dependencies
//Import dependencies
//Setup webcam and canvas
//Define references to those
//Load facemesh
//Detect function
//Drawing utilities
//Load triangulation
//Setup triangle path
//Setup point drawing
//Add drawMesh to detect function

import React, { useRef } from "react";
import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
// import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  //Setup references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  //Detect Function
  const detect = async (net) => {
    // console.log(webcamRef.current);
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4

      //from the video
      // typeof webcamRef.current !== "undefined" &&
      // webcamRef.current &&
      // webcamRef.current.video.readystate === 4
    ) {
      //Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video width
      webcamRef.current.width = videoWidth;
      webcamRef.current.height = videoHeight;

      //Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //Make detections
      const face = await net.estimateFaces(video);
      // console.log(face);

      //Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };

  runFacemesh();
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        ></Webcam>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        ></canvas>
      </header>
    </div>
  );
}

export default App;
