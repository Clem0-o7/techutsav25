"use client";

import React from "react";

export const SnackbarComponent = ({ open, message, messageBack, setOpen }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: messageBack,
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      {message}
      <button
        onClick={() => setOpen(false)}
        style={{ marginLeft: "10px", background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
      >
        X
      </button>
    </div>
  );
};

export default SnackbarComponent;
