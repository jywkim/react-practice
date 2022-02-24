import React from "react";
import { Link } from "react-router-dom";

function Posts() {
  return (
    <div className="home">
      <div class="container">
        <Link to="/blog/this-is-a-post-title">
          <div class="row align-items-center my-5">
            <div class="col-lg-7">
              <img
                class="img-fluid rounded mb-4 mb-lg-0"
                src="http://placehold.it/900x400"
                alt=""
              />
            </div>
            <div class="col-lg-5">
              <h1 class="font-weight-light">This is a post title</h1>
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