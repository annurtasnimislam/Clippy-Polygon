import classes from "./Shapes.module.css";

export default function Shapes({ setPoints }) {
  const shapes = [
    "triangle",
    "trapezoid",
    "parallelogram",
    "rhombus",
    "pentagon",
    "hexagon",
    "heptagon",
  ];

  const handleShape = (shape) => {
    if (shape === "triangle") {
      setPoints([
        { x: 50, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
      ]);
    }
    if (shape === "trapezoid") {
      setPoints([
        { x: 20, y: 0 },
        { x: 80, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ]);
    }
    if (shape === "parallelogram") {
      setPoints([
        { x: 25, y: 0 },
        { x: 100, y: 0 },
        { x: 75, y: 100 },
        { x: 0, y: 100 },
      ]);
    }
    if (shape === "rhombus") {
      setPoints([
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 },
      ]);
    }
    if (shape === "pentagon") {
      setPoints([
        { x: 50, y: 0 },
        { x: 100, y: 38 },
        { x: 82, y: 100 },
        { x: 18, y: 100 },
        { x: 0, y: 38 },
      ]);
    }
    if (shape === "hexagon") {
      setPoints([
        { x: 25, y: 0 },
        { x: 75, y: 0 },
        { x: 100, y: 50 },
        { x: 75, y: 100 },
        { x: 25, y: 100 },
        { x: 0, y: 50 },
      ]);
    }
    if (shape === "heptagon") {
      setPoints([
        { x: 50, y: 0 },
        { x: 90, y: 20 },
        { x: 100, y: 60 },
        { x: 75, y: 100 },
        { x: 25, y: 100 },
        { x: 25, y: 100 },
        { x: 0, y: 60 },
        { x: 10, y: 20 },
      ]);
    }
  };

  return (
    <div className={classes.shapeBox}>
      {shapes.map((s, i) => (
        <div key={i} onClick={() => handleShape(s)}>
          <img src="" alt="" />
          <p>{s}</p>
        </div>
      ))}
    </div>
  );
}
