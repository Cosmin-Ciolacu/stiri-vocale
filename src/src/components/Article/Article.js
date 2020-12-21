import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import "./Article.css";

const Article = ({ article: { title, description, url, urlToImage }, i }) => {
  return (
    <Card className="article">
      <CardActionArea href={url}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={
            urlToImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjCAfVgATBaPFFWX2WWJF6x-gVW4P1mdvfKA&usqp=CAU"
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {`${i}. ${title}`}
          </Typography>
          <Typography variant="p" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Article;
