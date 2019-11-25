import React from "react";
import GeoJsonLayerMap from "./GeoJsonLayerMap";
import MarkerMap from "./MarkerMap";
import usRegion from "./us_region_geojson.json";

const TOKEN =
  "pk.eyJ1Ijoic2Fnd2FzY3JpcHQiLCJhIjoiY2syZGVpeHNoMGY2MTNkbHFiMTZiejZyOCJ9.6EuAUuNNqWnaIINOwkLwBw";
const mapStyle = "mapbox://styles/mapbox/satellite-streets-v10";

function App() {
  return <GeoJsonLayerMap token={TOKEN} mapStyle={mapStyle} data={usRegion} />;
  // return <MarkerMap token={TOKEN} style={mapStyle} />;
}

export default App;
