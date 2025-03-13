import React from "react";
import styles from "../styles/modal.module.css";

export const PleasePlaceTray = () => {

  return (
    <div style={{
        backgroundColor: "white",
        width: "50vw",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "2rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}>
        <div>
            <h1>Please place a tray in the scanning area to begin assembly.</h1>
        </div>
    </div>
  );
};
