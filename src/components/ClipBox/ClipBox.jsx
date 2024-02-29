import { useRef } from "react";
import classes from "./ClipBox.module.css";
import BorderLine from "./BorderLine/BorderLine";

export default function ClipBox({ points, setPoints }) {
  const dragRef = useRef(null);
  const boxRef = useRef(null);

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
  };

  return (
    <div className={classes.clipBox}>
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
      {points.map((point, index) => (
        <div
          key={index}
          className={classes.handle}
          style={{ left: `${point.x - 3.5}%`, top: `${point.y - 3}%` }}
          onMouseDown={(e) => handleMouseDown(index, e)}
        />
      ))}

      {points.map((startPoint, index) => {
        const endPoint = points[(index + 1) % points.length];
        return (
          <BorderLine
            key={index}
            startPoint={startPoint}
            endPoint={endPoint}
            points={points}
            setPoints={setPoints}
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
