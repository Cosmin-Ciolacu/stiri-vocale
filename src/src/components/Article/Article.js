import React from "react";

const Article = ({ article, i }) => {
  return (
    <div className="article">
      <h1>{article.title}</h1>
      <p>{i}</p>
    </div>
  );
};

export default Article;
