import React, { useState, useRef } from "react";
import classes from "./ClipBox.module.css";

export default function ClipBox() {
  const [points, setPoints] = useState([
    { x: 50, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ]);

  const dragRef = useRef(null);

  const handleMouseDown = (index, e) => {
    e.preventDefault();
    dragRef.current = { index, startX: e.clientX, startY: e.clientY };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (dragRef.current !== null) {
      const { index } = dragRef.current;
      const outerBox = document.querySelector(`.${classes.clipBox}`);
      const outerBoxRect = outerBox.getBoundingClientRect();

      let mouseX = e.clientX - outerBoxRect.left;
      let mouseY = e.clientY - outerBoxRect.top;

      // Ensure the mouse coordinates stay within the bounds of the outer box
      mouseX = Math.max(0, Math.min(mouseX, outerBoxRect.width));
      mouseY = Math.max(0, Math.min(mouseY, outerBoxRect.height));

      const percentageX = (mouseX / outerBoxRect.width) * 100;
      const percentageY = (mouseY / outerBoxRect.height) * 100;

      const newPoints = [...points];
      newPoints[index] = { x: percentageX, y: percentageY };
      setPoints(newPoints);
    }
  };

  const handleMouseUp = () => {
    dragRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

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
      <p>
        clip-path: polygon(
        {points
          .map((point) => `${parseInt(point.x)}% ${parseInt(point.y)}%`)
          .join(", ")}
        );
      </p>
    </div>
  );
}
