import classes from "./BorderLine.module.css";

const BorderLine = ({ startPoint, endPoint }) => {
  const distanceX = endPoint.x - startPoint.x;
  const distanceY = endPoint.y - startPoint.y;

  const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  const sideLength = Math.hypot(distanceX, distanceY);

  const style = {
    width: `${sideLength}%`,
    transform: `rotate(${angle}deg)`,
    transformOrigin: "0% 0%",
    position: "absolute",
    left: `${startPoint.x}%`,
    top: `${startPoint.y}%`,
  };

  return <div className={classes.side} style={style}></div>;
};

export default BorderLine;
