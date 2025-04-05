import * as faceapi from "@vladmandic/face-api";

export const loadModels = async () => {
  console.log("📌 Loading Face-api.js models...");

  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  await faceapi.nets.ageGenderNet.loadFromUri("/models");

  console.log("✅ Models Loaded Successfully!");
};

export const detectFaceData = async (videoElement) => {
  const detections = await faceapi
    .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions()
    .withAgeAndGender();

  if (detections) {
    const { expressions, age, gender } = detections;

    const mood = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    return { mood, age: Math.round(age), gender };
  }

  return { mood: "neutral", age: null, gender: "unknown" };
};
