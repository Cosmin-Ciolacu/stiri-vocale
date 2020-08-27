import React from "react";

import "./Mic.css";

const Mic = ({ transcript, startListening }) => {
  return (
    <div className="mic">
      {transcript && <p>{transcript}</p>}
      <div
        className="mic-btn"
        onClick={() => startListening({ language: "ro-RO" })}
      >
        <img
          src="https://img.icons8.com/ios-filled/50/000000/microphone.png"
          alt="mic"
        />
      </div>
    </div>
  );
};

export default Mic;
