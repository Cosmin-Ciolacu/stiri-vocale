import React from "react";
import "./Tips.css";

const Tips = ({ tips }) => {
  return (
    <div className="tips-container">
      <ul className="tips-ul">
        {tips.map((tip) => (
          <li className="tip">{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
