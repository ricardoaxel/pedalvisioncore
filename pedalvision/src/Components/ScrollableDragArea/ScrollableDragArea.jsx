import { Style, pedalStyle } from "./ScrollableDragArea.css";
import { Images } from "../../assets/images";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { exampleData } from "./exampleData";

const ScrollableDragArea = ({ className }) => {
  const [position, setPosition] = useState({ x: 20, y: 30 });

  const handleEvent = (e, data) => {
    setPosition({ x: data.lastX, y: data.lastY });
  };

  return (
    <div css={Style()} className={className}>
      <Draggable
        position={position}
        bounds=""
        onStop={(e, data) => handleEvent(e, data)}
      >
        <img
          css={pedalStyle(8, 10, 10)}
          // src={"/../../assets/Images/rat.png"}
          src={require(`../../assets/Images/pedals/rat.png`)}
          //To avoid the default HTML5 drag API
          draggable="false"
          alt=""
        />
      </Draggable>
    </div>
  );
};

export { ScrollableDragArea };
