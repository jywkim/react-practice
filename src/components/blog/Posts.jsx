import React from "react";
import { BlogLink } from "./BlogLink";

function Posts() {
  return (
    <div className="home">
      <div className="container">
        <BlogLink 
          to="/blog/this-is-a-post-title" 
          name="This is a post title"
          desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis unde maxime dolore consectetur nisi facilis, aliquam modi ducimus amet aspernatur praesentium itaque quae officia rerum autem consequatur quibusdam odio ullam?"
        />

        <BlogLink 
          to="/marsrover" 
          name="Mars Rover"
          desc="Mars Rover"
        />

        <BlogLink 
          to="/restaurant" 
          name="Restaurant"
          desc="Restaurant"
        />

        <BlogLink 
          to="/reviews" 
          name="Reviews"
          desc="Reviews"
        />

        <BlogLink 
          to="/shopping" 
          name="Shopping"
          desc="Shopping"
        />

        <BlogLink 
          to="/promo" 
          name="Promo"
          desc="Promo"          
        />

        <BlogLink 
          to="/data" 
          name="Data"
          desc="Data"          
        />
      </div>
    </div>
  );
}

export default Posts;