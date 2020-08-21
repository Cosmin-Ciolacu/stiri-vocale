import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

import speak from "./utils/speak";
import "./App.css";

let api_url =
  "https://newsapi.org/v2/top-headlines?country=ro&apiKey=ded33f1154484e858d066d1e5ca39e1c";

const App = () => {
  const [articles, setArticles] = useState([]);

  const commands = [
    {
      command: "Arată cele mai noi știri",
      callback: async () => {
        const res = await axios.get(api_url);
        const { data } = res;
        const { articles } = data;
        speak("acestea sunt rezultatele");
        setArticles(articles);
      },
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="app">
      <div className="header"></div>
      <div className="articles"></div>
      <div className="mic">
        {transcript && <p>{transcript}</p>}
        <div
          className="mic-btn"
          onClick={() =>
            SpeechRecognition.startListening({ language: "ro-RO" })
          }
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/microphone.png"
            alt="mic"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
