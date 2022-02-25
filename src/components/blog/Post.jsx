import React, { useEffect } from "react";
import { useParams } from "react-router";

function Post() {
  let { postSlug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [postSlug]);

  return (
    <div className="home">
      <div className="container">
        <h1 className="mt-5">This is a Post Title</h1>
        <h6 className="mb-5">The post slug is, {postSlug}</h6>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis unde maxime dolore consectetur nisi facilis, aliquam modi ducimus amet aspernatur praesentium itaque quae officia rerum autem consequatur quibusdam odio ullam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis unde maxime dolore consectetur nisi facilis, aliquam modi ducimus amet aspernatur praesentium itaque quae officia rerum autem consequatur quibusdam odio ullam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis unde maxime dolore consectetur nisi facilis, aliquam modi ducimus amet aspernatur praesentium itaque quae officia rerum autem consequatur quibusdam odio ullam?
        </p>
      </div>
    </div>
  );
}

export default Post;