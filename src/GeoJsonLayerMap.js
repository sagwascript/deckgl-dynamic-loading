import React, { useState } from "react";
import DeckGL, { GeoJsonLayer, IconLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import centroid from "@turf/centroid";
import MapInfo from "./MapInfo";
import LocationIcon from "./location.png";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 32, height: 32 }
};

function GeoJsonLayerMap(props) {
  const [displayMapInfo, setDisplayMapInfo] = useState(false);
  const [locationData, setLocationData] = useState({});

  const usRegionPoint = geojson => {
    const points = geojson.features.map(data => {
      let point = centroid(data).geometry;
      return { ...point, properties: data.properties };
    });
    return points;
  };

  const renderLayer = () => {
    if (props.viewState.zoom > 5)
      return new GeoJsonLayer({
        id: "geojson-layer",
        data: { type: "FeatureCollection", features: props.data },
        pickable: true,
        stroked: true,
        filled: true,
        extruded: false,
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getFillColor: [160, 160, 180, 200],
        getLineColor: [0, 0, 0, 255],
        getRadius: 100,
        getLineWidth: 1,
        getElevation: 30,
        onClick: ({ object, x, y }) => {
          const tooltip = object.properties.name;
          console.log(tooltip);
          setLocationData(object.properties);
          setDisplayMapInfo(true);
        }
      });
    else
      return new IconLayer({
        id: "icon-layer",
        data: usRegionPoint(props.data),
        iconAtlas: LocationIcon,
        iconMapping: ICON_MAPPING,
        getIcon: d => "marker",
        sizeScale: 15,
        getPosition: d => d.coordinates,
        getSize: d => 5,
        onClick: ({ object, x, y }) => {
          const tooltip = `${object.name}`;
          console.log(tooltip);
        }
      });
  };

  return (
    <React.Fragment>
      <MapInfo
        data={locationData}
        hide={() => setDisplayMapInfo(false)}
        show={displayMapInfo}
      />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "relative",
          margin: "0 auto"
        }}
      >
        <DeckGL
          initialViewState={props.initialView}
          viewState={props.viewState}
          height="100%"
          width="100%"
          controller={true}
          onViewStateChange={props.handleViewStateChange}
          layers={[renderLayer()]}
        >
          <StaticMap
            mapboxApiAccessToken={props.token}
            mapStyle={props.mapStyle}
          />
        </DeckGL>
      </div>
    </React.Fragment>
  );
}

export default GeoJsonLayerMap;
