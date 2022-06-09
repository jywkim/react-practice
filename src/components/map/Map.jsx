import React from "react";
import App from './index';

function Map() {
  return (
    <div className="map">
      <div className="container">
        <div className="row align-items-center my-6">
          <div className="col-lg-10">
            <h1 className="font-weight-light">Map</h1>
            < App />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;