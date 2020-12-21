import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

import Mic from "./components/Mic/Mic";
import Article from "./components/Article/Article";
import Tips from "./components/Tips/Tips";

import speak from "./utils/speak";
import "./App.css";

let api_url =
  "https://newsapi.org/v2/top-headlines?country=ro&apiKey=ded33f1154484e858d066d1e5ca39e1c";

const newsTips = ["Arată cele lai noi știri", "Caută știri de <domeniu>"];
const controlTips = ["Deschide articolul <număr articol>", "Derulează în jos"];

const App = () => {
  const [articles, setArticles] = useState([]);
  const [tips, setTips] = useState(newsTips);
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
        setTips(controlTips);
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
    {
      command: "caută știri de *",
      callback: async (q) => {
        if (!q) return;
        try {
          q = q.split(" ").join("-");
          const res = await axios.get(`${api_url}&q=${q}`);
          const { data } = res;
          const { articles } = data;
          setArticles(articles);
        } catch (error) {}
      },
    },
    {
      command: "derulează în jos",
      callback: () => {
        console.log("derulare in jos");
        window.scrollY = 100;
      },
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("eroare!!");
  }

  return (
    <div className="container app">
      <div className="header">
        <h1>ȘTIRI VOCALE</h1>
        <Tips tips={tips} />
      </div>
      <div className="articles">
        {articles.length ? (
          articles.map((art, i) => <Article article={art} i={i + 1} key={i} />)
        ) : (
          <h3 className="title">Nu exista articole</h3>
        )}
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        <Mic
          transcript={transcript}
          startListening={SpeechRecognition.startListening}
        />
      </div>
    </div>
  );
};

export default App;
