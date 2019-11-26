import React from "react";
import MapContainer from "./MapContainer";
import MarkerMap from "./MarkerMap";
import usRegion from "./us_region_geojson.json";

const TOKEN = "YOUR_TOKEN_HERE";
const mapStyle = "mapbox://styles/mapbox/satellite-streets-v10";

function App() {
  return <MapContainer token={TOKEN} mapStyle={mapStyle} data={usRegion} />;
  // return <MarkerMap token={TOKEN} style={mapStyle} />;
}

export default App;
