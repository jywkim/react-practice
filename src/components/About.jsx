import React from "react";

function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">About</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis unde maxime dolore consectetur nisi facilis, aliquam modi ducimus amet aspernatur praesentium itaque quae officia rerum autem consequatur quibusdam odio ullam?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;