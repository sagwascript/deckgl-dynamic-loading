import React, { useState } from "react";
import GeoJsonLayerMap from "./GeoJsonLayerMap";

const latDistance = 2.5;
const lngDistance = 7.1;

const MapContainer = props => {
  const initialView = {
    longitude: -100.04,
    latitude: 38.907,
    zoom: 3
  };

  const [viewState, setViewState] = useState(initialView);

  const handleViewStateChange = ({
    viewState,
    interactionState,
    oldViewState
  }) => {
    setViewState(viewState);
  };

  const filterNearestRegion = features => {
    const maxLat = viewState.latitude + latDistance;
    const minLat = viewState.latitude - latDistance;
    const maxLng = viewState.longitude + lngDistance;
    const minLng = viewState.longitude - lngDistance;
    return features.filter(data => {
      const insideArea = data.geometry.coordinates[0].filter(point => {
        if (
          point[0] <= maxLng &&
          point[0] >= minLng &&
          point[1] <= maxLat &&
          point[1] >= minLat
        ) {
          return true;
        }
        return false;
      });
      return insideArea.length > 0;
    });
  };

  const generateData = () => {
    if (viewState.zoom > 5) return filterNearestRegion(props.data.features);
    return props.data;
  };

  return (
    <GeoJsonLayerMap
      token={props.token}
      mapStyle={props.mapStyle}
      data={generateData()}
      initialView={initialView}
      viewState={viewState}
      handleViewStateChange={handleViewStateChange}
    />
  );
};

export default MapContainer;
