import React, { useState, useEffect } from "react";
import classes from "./ClipBox.module.css";

export default function ClipBox() {
  const [points, setPoints] = useState([
    { x: 50, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ]);

  const handleMouseDown = (index, e) => {
    e.preventDefault();
    document.addEventListener("mousemove", (e) => handleMouseMove(index, e));
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (index, e) => {
    const rect = document.body.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newPoints = [...points];
    newPoints[index] = { x: mouseX, y: mouseY };
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={classes.clipBox}>
      <div
        className={classes.triangle}
        style={{
          clipPath: `polygon(${points
            .map((point) => `${point.x}% ${point.y}%`)
            .join(", ")})`,
        }}
      ></div>
      {points.map((point, index) => (
        <div
          key={index}
          className={classes.handle}
          style={{ left: `${point.x - 3.5}%`, top: `${point.y - 3}%` }}
          onMouseDown={(e) => handleMouseDown(index, e)}
        />
      ))}
    </div>
  );
}
