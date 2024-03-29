import { useRef, useEffect, useState } from "react";
import classes from "./ClipBox.module.css";
import BorderLine from "./BorderLine/BorderLine";

export default function ClipBox({
  points,
  setPoints,
  select,
  setSelect,
  zoomLevel,
  setZoomLevel,
}) {
  const dragRef = useRef(null);
  const boxRef = useRef(null);
  console.log("ok");

  const handleMouseDown = (index, e) => {
    e.preventDefault();
    dragRef.current = { index, startX: e.clientX, startY: e.clientY };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (dragRef.current !== null) {
      const { index } = dragRef.current;
      const outerBox = boxRef.current;
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
    setZoomLevel(1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && select !== null) {
      if (points.length > 3) {
        const newPoints = [...points];
        newPoints.splice(select, 1);
        setPoints(newPoints);
        setSelect(null);
      } else {
        alert('Minimum number of handlers should be 3 to operate "delete"');
        setSelect(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [select, points]);

  const handleWheel = (event) => {
    if (event.metaKey) {
      event.preventDefault();

      const newZoomLevel = zoomLevel + event.deltaY / 100;
      const clampedZoomLevel = Math.max(0.5, Math.min(newZoomLevel, 1));

      // Get the center coordinates of the outer box
      const outerBox = boxRef.current;
      const outerBoxRect = outerBox.getBoundingClientRect();
      const centerX = outerBoxRect.width / 2;
      const centerY = outerBoxRect.height / 2;

      // Adjust the points based on the zoom level and center coordinates
      const adjustedPoints = points.map((point) => ({
        x: ((point.x - 50) / zoomLevel) * clampedZoomLevel + 50,
        y: ((point.y - 50) / zoomLevel) * clampedZoomLevel + 50,
      }));

      setPoints(adjustedPoints);
      setZoomLevel(clampedZoomLevel);
    }
  };

  return (
    <div className={classes.clipBox} onWheel={handleWheel}>
      <div
        className={classes.triangle}
        id="outerBox"
        ref={boxRef}
        style={{
          clipPath: `polygon(${points
            .map((point) => `${point.x}% ${point.y}%`)
            .join(", ")})`,
        }}
      ></div>
      {points.map((point, index) => {
        return (
          <div
            key={index}
            className={classes.handle}
            style={{
              left: `${point.x - 3.5}%`,
              top: `${point.y - 3}%`,
              border: select === index ? "2px solid blue" : "",
            }}
            onMouseDown={(e) => handleMouseDown(index, e)}
            onClick={() => setSelect(index)}
          />
        );
      })}

      {points.map((startPoint, index) => {
        const endPoint = points[(index + 1) % points.length];
        return (
          <BorderLine
            key={index}
            startPoint={startPoint}
            endPoint={endPoint}
            points={points}
            setPoints={setPoints}
            setSelect={setSelect}
            ref={boxRef}
          />
        );
      })}
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
