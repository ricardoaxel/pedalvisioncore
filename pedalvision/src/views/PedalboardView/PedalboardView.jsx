import { useState } from "react";
import { style } from "./PedalboardView.css";
const PedalboardView = () => {
  const [color, setColor] = useState("red");
  return <div css={style(color)}>PedalboardView</div>;
};

export default PedalboardView;
