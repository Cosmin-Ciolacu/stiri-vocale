import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

import Mic from "./components/Mic/Mic";
import Article from "./components/Article/Article";

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
        //console.log(articles);
        speak("acestea sunt rezultatele");
        setArticles(articles);
      },
    },
    {
      command: "deschide articolul *",
      callback: (number) => {
        number = +number;
        let article = null;
        articles.forEach((art, i) => {
          if (number === i + 1) {
            article = art;
          }
        });
        if (!article || !article.url) {
          speak("Nu se poate deschide acest articol");
          return;
        }
        window.open(article.url, "_blank");
      },
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("eroare!!");
  }

  return (
    <div className="app">
      <div className="header"></div>
      <div className="articles">
        {articles.map((art, i) => (
          <Article article={art} i={i + 1} />
        ))}
      </div>
      <Mic
        transcript={transcript}
        startListening={SpeechRecognition.startListening}
      />
    </div>
  );
};

export default App;
