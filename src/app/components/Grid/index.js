"use client";

import "./grid.css";
import { useEffect, useState } from "react";

export default function Grid() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.shiftKey && event.key === "W") {
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    console.log("Shift + W > Grid mode ✌(-‿-)✌");

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div id="grid" style={{ display: isVisible ? "flex" : "none" }}>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
    </div>
  );
}
