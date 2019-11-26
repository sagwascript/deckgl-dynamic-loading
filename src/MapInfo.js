import React from "react";

const MapInfo = props => {
  return (
    <div
      style={{
        position: "absolute",
        left: !props.show ? -300 : 0,
        height: "100vh",
        width: 300,
        background: "gray",
        zIndex: 1,
        transition: "500ms left ease"
      }}
    >
      <button onClick={() => props.hide()}>X</button>
      <h1 style={{ textAlign: "center" }}>{props.data.name}</h1>
    </div>
  );
};

export default MapInfo;
