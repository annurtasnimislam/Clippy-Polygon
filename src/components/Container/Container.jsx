import ClipBox from "../ClipBox/ClipBox";
import classes from "./Container.module.css";

export default function Container() {
  return (
    <div className={classes.wrapper}>
      <ClipBox />
    </div>
  );
}
