import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

class MarkerMap extends Component {
  state = {
    viewport: {
      latitude: 37.78,
      longitude: -122.41,
      height: "100vh",
      width: "100vw",
      zoom: 8
    },
    marker1: [-122.41, 37.78],
    marker2: [-123.41, 38.78]
  };

  markerChange = (name, lngLat) => {
    this.setState({ [name]: lngLat });
  };

  render() {
    console.log(
      "Jarak longitude :",
      this.state.marker1[0] - this.state.marker2[0]
    );
    console.log(
      "Jarak latitude :",
      this.state.marker1[1] - this.state.marker2[1]
    );
    return (
      <ReactMapGL
        mapboxApiAccessToken={this.props.token}
        mapStyle={this.props.style}
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Marker
          name="marker1"
          latitude={this.state.marker1[1]}
          longitude={this.state.marker1[0]}
          draggable
          onDragEnd={event => this.markerChange("marker1", event.lngLat)}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div style={{ height: 20, width: 20, background: "blue" }}></div>
        </Marker>
        <Marker
          name="marker2"
          latitude={this.state.marker2[1]}
          longitude={this.state.marker2[0]}
          draggable
          onDragEnd={event => this.markerChange("marker2", event.lngLat)}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div style={{ height: 20, width: 20, background: "red" }}></div>
        </Marker>
      </ReactMapGL>
    );
  }
}

export default MarkerMap;
