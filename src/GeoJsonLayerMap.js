import React, { useState } from "react";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import centroid from "@turf/centroid";

/*
 * PREDEFINED AREA
  Longitude distance : 7.1
  Latitude distance : 2.5
*/

const latDistance = 2.5;
const lngDistance = 7.1;

function GeoJsonLayerMap(props) {
  const initialView = {
    longitude: -100.04,
    latitude: 38.907,
    zoom: 3
  };

  const [viewState, setViewState] = useState(initialView);

  console.log("====");
  console.log("longitude :", viewState.longitude);
  console.log("latitude :", viewState.latitude);

  const handleViewStateChange = ({
    viewState,
    interactionState,
    oldViewState
  }) => {
    setViewState(viewState);
  };

  const usRegionPoint = geojson => {
    const points = geojson.features.map(data => ({
      ...centroid(data),
      properties: data.properties
    }));
    return {
      ...geojson,
      features: points
    };
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

  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data:
      viewState.zoom > 5
        ? filterNearestRegion(props.data.features)
        : usRegionPoint(props.data),
    pickable: true,
    stroked: true,
    filled: true,
    extruded: false,
    lineWidthScale: 20,
    lineWidthMinPixels: viewState.zoom > 5 ? 2 : 10,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [0, 0, 0, 255],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
    onClick: ({ object, x, y }) => {
      const tooltip = object.properties.name;
      console.log(tooltip);
      /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    }
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        margin: "0 auto"
      }}
    >
      <DeckGL
        initialViewState={initialView}
        viewState={viewState}
        height="100%"
        width="100%"
        controller={true}
        onViewStateChange={handleViewStateChange}
        layers={[layer]}
      >
        <StaticMap
          mapboxApiAccessToken={props.token}
          mapStyle={props.mapStyle}
        />
      </DeckGL>
    </div>
  );
}

export default GeoJsonLayerMap;
