import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";
import { getThemeBasedOnMood } from "../utils/moodModel";

const Home = () => {
  const [theme, setTheme] = useState(getThemeBasedOnMood("neutral"));

  const handleMoodChange = (mood) => {
    setTheme(getThemeBasedOnMood(mood));
  };

  return (
    <div style={{ ...theme, height: "100%", textAlign: "center" }}>
      <h1>Emotion-Based UI</h1>
      <WebcamCapture onMoodChange={handleMoodChange} />
      <p>Mood-based UI is changing dynamically!</p>
    </div>
  );
};

export default Home;
