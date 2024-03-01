import { ClipBox, Shapes } from "./components";
import { useState } from "react";
import classes from "./App.module.css";

export default function Container() {
  console.log("ok");

  const [points, setPoints] = useState([
    { x: 50, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ]);
  const [select, setSelect] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className={classes.wrapper}>
      <ClipBox
        points={points}
        setPoints={setPoints}
        select={select}
        setSelect={setSelect}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />
      <Shapes
        setPoints={setPoints}
        setSelect={setSelect}
        setZoomLevel={setZoomLevel}
      />
    </div>
  );
}
