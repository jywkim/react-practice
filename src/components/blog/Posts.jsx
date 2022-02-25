import React from "react";
import { Link } from "react-router-dom";

function Posts() {
  return (
    <div className="home">
      <div className="container">
        <Link to="/blog/this-is-a-post-title">
          <div className="row align-items-center my-5">
            <div className="col-lg-5">
              <h1 className="font-weight-light">This is a post title</h1>
              <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis unde maxime dolore consectetur nisi facilis, aliquam modi ducimus amet aspernatur praesentium itaque quae officia rerum autem consequatur quibusdam odio ullam?
            </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Posts;