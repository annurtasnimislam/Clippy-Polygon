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
    document.addEventListener("mouseup", handleMouseUp(e));
  };

  const handleMouseMove = (index, e) => {
    const outerBox = document.querySelector(`.${classes.clipBox}`);
    const outerBoxRect = outerBox.getBoundingClientRect();

    const mouseX = e.clientX - outerBoxRect.left;
    const mouseY = e.clientY - outerBoxRect.top;

    // Ensure the mouse coordinates stay within the bounds of the outer box
    const boundedX = Math.max(0, Math.min(mouseX, outerBoxRect.width));
    const boundedY = Math.max(0, Math.min(mouseY, outerBoxRect.height));

    const percentageX = (boundedX / outerBoxRect.width) * 100;
    const percentageY = (boundedY / outerBoxRect.height) * 100;

    const newPoints = [...points];
    newPoints[index] = { x: percentageX, y: percentageY };
    setPoints(newPoints);
  };

  const handleMouseUp = (e) => {
    console.log("done");
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
