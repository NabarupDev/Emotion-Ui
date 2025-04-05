import React, { useEffect, useRef, useState } from "react";
import { loadModels, detectFaceData } from "../utils/moodModel";
import { Container, Typography, Paper, Box } from "@mui/material";
import { motion } from "framer-motion"; // 🔥 Super Smooth Animations

const moodStyles = {
  happy: { background: "radial-gradient(circle, #ffcc00, #ff6600)" }, // 🟡 Golden Glow  
  sad: { background: "radial-gradient(circle, #243B55, #141E30)" }, // 🔵 Deep Space Blue  
  angry: { background: "radial-gradient(circle, #ff4b2b, #ff416c)" }, // 🔴 Inferno Red  
  surprised: { background: "radial-gradient(circle, #38ef7d, #11998e)" }, // 🟢 Matrix Green  
  neutral: { background: "radial-gradient(circle, #2b5876, #4e4376)" }, // 🟣 Rich Purple  
  fearful: { background: "radial-gradient(circle, #7b4397, #dc2430)" }, // 🟠 Mystic Orange  
  disgusted: { background: "radial-gradient(circle, #4b134f, #2c3e50)" }, // ⚫ Dark Night  
};

const moodIcons = {
  happy: "😃",
  sad: "😢",
  angry: "😡",
  surprised: "😲",
  neutral: "😐",
  fearful: "😨",
  disgusted: "🤢",
};

const moodMusic = {
  happy: "https://www.youtube.com/embed/qpIdoaaPa6U?start=39&autoplay=1",
  sad: "https://www.youtube.com/embed/sVRwZEkXepg?start=43&autoplay=1",
  angry: "https://www.youtube.com/embed/BiVyN2ftrrs?start=19&autoplay=1",
  surprised: "https://www.youtube.com/embed/ZbZSe6N_BXs?autoplay=1", // Random surprise song (Pharrell Williams - Happy)
  neutral: "https://www.youtube.com/embed/AtnMG_40604?start=36&autoplay=1",
  fearful: "https://www.youtube.com/embed/WRoLW48WOBg?start=27&autoplay=1",
  disgusted: "https://www.youtube.com/embed/yom3HewJev4?start=24&autoplay=1",
};

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const [mood, setMood] = useState("neutral");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("unknown");
  const [prevMood, setPrevMood] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const setupCamera = async () => {
      await loadModels();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    setupCamera();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const { mood, age, gender } = await detectFaceData(videoRef.current);
        setMood(mood);
        setAge(age);
        setGender(gender);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mood !== prevMood && musicPlaying) {
      playMoodMusic();
    }
    setPrevMood(mood);
  }, [mood, musicPlaying]);

  const playMoodMusic = () => {
    if (iframeRef.current) {
      iframeRef.current.src = moodMusic[mood];
    }
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    if (!musicPlaying) {
      playMoodMusic();
    } else if (iframeRef.current) {
      iframeRef.current.src = "";
    }
  };

  return (
    <Box
      sx={{
        ...moodStyles[mood],
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.5s ease-in-out",
        position: "relative",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper
            elevation={15}
            sx={{
              p: 4,
              borderRadius: "20px",
              backdropFilter: "blur(15px)",
              background: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 15px 50px rgba(0, 0, 0, 0.3)",
              color: "#fff",
              textAlign: "center",
              maxWidth: "500px",
              mx: "auto",
              transition: "all 0.4s ease",
              "&:hover": {
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: "26px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#f8f8f8",
              }}
            >
              🚀 **Billionaire UI**
            </Typography>

            <motion.video
              ref={videoRef}
              autoPlay
              playsInline
              width="100%"
              height="auto"
              style={{
                borderRadius: "15px",
                border: "3px solid rgba(255,255,255,0.15)",
                boxShadow: "0 5px 20px rgba(255,255,255,0.1)",
                display: "block",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            ></motion.video>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mt: 3,
                  fontWeight: "bold",
                  fontSize: "22px",
                  color: "#f1f1f1",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                }}
              >
                Mood: {mood} {moodIcons[mood]}
              </Typography>
              <Typography variant="h6" sx={{ color: "#ddd" }}>
                Gender: {gender}
              </Typography>
              <Typography variant="h6" sx={{ color: "#ddd" }}>
                Age: {age ? age : "Detecting..."} 
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <button 
                  onClick={toggleMusic}
                  style={{
                    background: musicPlaying ? 'rgba(255,50,50,0.8)' : 'rgba(50,205,50,0.8)',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {musicPlaying ? '🔇 Stop Music' : '🎵 Play Mood Music'}
                </button>
              </Box>
              
              <iframe 
                ref={iframeRef}
                width="0" 
                height="0" 
                frameBorder="0"
                allow="autoplay"
                style={{ display: 'none' }}
                title="mood music"
              />
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WebcamCapture;
