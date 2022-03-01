import React from "react";
import Export from './Export';

function Excelexport() {
  return (
    <div className="excelexport">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Excel-Export</h1>
            < Export />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Excelexport;