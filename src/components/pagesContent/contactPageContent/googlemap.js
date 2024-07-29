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

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
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
