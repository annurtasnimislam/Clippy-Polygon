import classes from "./BorderLine.module.css";

const BorderLine = ({ startPoint, endPoint, setPoints, points, setSelect }) => {
  const distanceX = endPoint.x - startPoint.x;
  const distanceY = endPoint.y - startPoint.y;

  const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  const sideLength = Math.hypot(distanceX, distanceY);

  const handleClick = (e) => {
    setSelect(null);
    const outerBox = document.querySelector("#outerBox");
    // const outerBox = boxRef.current;
    const outerBoxRect = outerBox.getBoundingClientRect();

    let mouseX = e.clientX - outerBoxRect.left;
    let mouseY = e.clientY - outerBoxRect.top;

    const percentageX = (mouseX / outerBoxRect.width) * 100;
    const percentageY = (mouseY / outerBoxRect.height) * 100;

    // Finds the index of the endPoint in the points array
    const endIndex = points.findIndex((point) => point === endPoint);

    // Inserts the new point after the endPoint
    const newPoints = [
      ...points.slice(0, endIndex), // Points before the endPoint
      { x: percentageX, y: percentageY }, // New point
      ...points.slice(endIndex), // Points after the endPoint
    ];

    setPoints(newPoints);
  };

  const style = {
    width: `${sideLength}%`,
    transform: `rotate(${angle}deg)`,
    transformOrigin: "0% 0%",
    position: "absolute",
    left: `${startPoint.x}%`,
    top: `${startPoint.y}%`,
  };

  return (
    <div className={classes.side} style={style} onClick={handleClick}></div>
  );
};

export default BorderLine;
