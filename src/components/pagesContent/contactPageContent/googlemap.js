import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapGoogle = () => {
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: 45.698187482643156,
    lng: -122.57438327055985,
  };

  const addMapMarker = (map) => {
    new window.google.maps.Marker({
      position: defaultCenter,
      map: map,
    });
  };
  console.log("ENV File Loaded:", process.env);
  console.log(
    "Google Maps API Key:",
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyC1fHkHT0q2zLKlV0qbKxHAMjPw6DGFpeY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        onLoad={addMapMarker}
      />
    </LoadScript>
  );
};

export default MapGoogle;
