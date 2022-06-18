import React from "react";
import "./index.css";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map.js";

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  })

  if (!isLoaded) return <div>Loading...</div>
  return <Map />;
}
