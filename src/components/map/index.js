import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./index.css";

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({lat: 41.8781, lng: -87.6298}), []);

  return  (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center}/>
    </GoogleMap>
    );
  }
