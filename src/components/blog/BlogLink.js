import React from 'react';
import { Link } from "react-router-dom";

export const BlogLink = (props) => {
    const to = props.to;
    const name = props.name;
    const desc = props.desc;

    return (
        <Link to={to}>
          <div className="row align-items-center my-5">
            <div className="col-lg-5">
              <h1 className="font-weight-light">{name}</h1>
              <p>
                {desc}
              </p>
            </div>
          </div>
        </Link>
    )
}