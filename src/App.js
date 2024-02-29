import { ClipBox, Shapes } from "./components";
import { useState } from "react";
import classes from "./App.module.css";

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
