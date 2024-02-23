import ClipBox from "../ClipBox/ClipBox";
import Shapes from "../Shapes/Shapes";
import classes from "./Container.module.css";
import { useState } from "react";

export default function Container() {
  const [points, setPoints] = useState([
    { x: 50, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ]);

  return (
    <div className={classes.wrapper}>
      <ClipBox points={points} setPoints={setPoints} />
      <Shapes setPoints={setPoints} />
    </div>
  );
}
