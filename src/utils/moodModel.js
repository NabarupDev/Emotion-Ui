import * as faceapi from "@vladmandic/face-api";

// 📌 Load Models
export const loadModels = async () => {
  console.log("📌 Loading Face-api.js models...");

  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  await faceapi.nets.ageGenderNet.loadFromUri("/models");

  console.log("✅ Models Loaded Successfully!");
};

// 📌 Detect Face, Mood, Age, Gender
export const detectFaceData = async (videoElement) => {
  const detections = await faceapi
    .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions()
    .withAgeAndGender();

  if (detections) {
    const { expressions, age, gender } = detections;

    // 🎭 Find Dominant Mood
    const mood = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    return { mood, age: Math.round(age), gender };
  }

  return { mood: "neutral", age: null, gender: "unknown" };
};
