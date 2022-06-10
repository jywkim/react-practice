import React, { useState } from "react";
import axios from 'axios';
import { Customers } from './Customers';
import "./index.css";

export default function App() {
  const [arrayAll, setArrayAll] = useState([]);
  const [arrayTargetGroup1, setArrayTargetGroup1] = useState([]);
  const [arrayTargetGroup2, setArrayTargetGroup2] = useState([]);
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  const urlSegments = process.env.REACT_APP_ANALYTICS_URL;
  
  const fileReader = new FileReader();

  const assignSegmentCode = (resData) => {
    let segmentCode = "";
    switch(resData.format) {
      case "multi":
        segmentCode = resData.data[0].prizm_id;
        break;
      case "unique":
        segmentCode = resData.data;
        break;
      default:
        segmentCode = "";
    }

    return segmentCode;
  }

  const getSegmentCode = async (postalCode) => {
    return await axios.get(urlSegments + "?postal_code=" + postalCode)
    .catch(error => {
      console.log("Error (Catch): Cannot make GET request");
    });
  }

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.replace("\r", "").split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        const headerTrim = header.trimLeft().trimRight();
        if (headerTrim === "Total_Visits" && values[index] !== undefined) {
          object[headerTrim] = parseInt(values[index]);
        } else {
          object[headerTrim] = values[index];
        }
        return object;
      }, {});
      return obj;
    })

    let map = {};
    let postalCode = "";

    const promises = [];
    for (let i = 0; i < array.length; i++) {
      postalCode = array[i]["CELPostal Code"];

      if (!map[postalCode]) {
        map[postalCode] = true;
      }

      if (postalCode in map) {
        const promise = getSegmentCode(postalCode);
        promises.push(promise);
      }
    }

    Promise.all(promises).then(res => {
      for (let i = 0; i < res.length; i++) {
        array[i]["Segment_Code"] = assignSegmentCode(res[i].data);
      }
      
      const targetGroup1 = array.filter(item => item.Segment_Code >= 1 && item.Segment_Code <= 30);
      const targetGroup2 = array.filter(item => item.Segment_Code >= 31 && item.Segment_Code <= 67);
      setArrayAll(array);
      setArrayTargetGroup1(targetGroup1);
      setArrayTargetGroup2(targetGroup2);
    });
  }

  const handleOnChange = (e) => {
    setSubmit(false);
    setArrayAll([]);
    setArrayTargetGroup1([]);
    setArrayTargetGroup2([]);
    setFile(e.target.files[0]);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (file) {
      if (file.type === "text/csv") {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        }

        fileReader.readAsText(file);

        setSubmit(true);
      } else {
        alert("Error: Invalid file type (CSV only)");
      }
    } else {
      alert("Error: No file selected");
    }
  }

  const headerKeys = Object.keys(Object.assign({}, ...arrayAll));

  const getTotalVisitsSum = (array) => {
    return array.reduce((prev, curr) => {
      return prev + (curr.Total_Visits || 0);
    }, 0)
  };

  const getTotalRecords = (array) => {
    return array.length > 0 ? array.length : 0;
  }

  return (
    <div className="Form">
      <form>
        <input 
          type={"file"} 
          id={"csvFileInput"}
          accept={".csv"} 
          onChange={handleOnChange}
        />
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Import CSV
        </button>
      </form>
      <br/>
      {submit && (
        arrayAll.length > 0 ? (
        <div className="containerTables">
          <h3>Group: All</h3>
          <h5>Records: {arrayAll.length - 1}</h5>
          <h5>Total Visits: {getTotalVisitsSum(arrayAll)}</h5>
          <Customers headerKeys={headerKeys} array={arrayAll}/>
          <br/>
          <br/>

          <h3>Group: Segment Codes 1 - 30</h3>
          <h5>Records: {getTotalRecords(arrayTargetGroup1)}</h5>
          <h5>Total Visits: {getTotalVisitsSum(arrayTargetGroup1)}</h5>
          <Customers headerKeys={headerKeys} array={arrayTargetGroup1}/>
          <br/>
          <br/>

          <h3>Group: Segment Codes 31 - 67</h3>
          <h5>Records: {getTotalRecords(arrayTargetGroup2)}</h5>
          <h5>Total Visits: {getTotalVisitsSum(arrayTargetGroup2)}</h5>
          <Customers headerKeys={headerKeys} array={arrayTargetGroup2}/>
        </div>
        ) : <div>Loading...</div>
      )}
    </div>
  );
}
