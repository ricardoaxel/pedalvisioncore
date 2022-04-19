import { Style } from "./PBElement.css";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";

const PBElement = ({
  el,
  index,
  elementTypeInfo,
  scale,
  showTransitions,
  handleEvent,
  setShowTransitions,
  deletePBElement,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <Draggable
      position={{
        x: el.x,
        y: el.y,
      }}
      key={index}
      bounds="parent"
      // onDrag={(e, data) => handleEvent(e, data, el.id, index)}
      onStop={(e, data) => handleEvent(data, index)}
      onDrag={() => setShowTransitions(false)}
      draggable="false"
    >
      <div
        css={Style(
          elementTypeInfo.Width,
          elementTypeInfo.Height,
          scale,
          false,
          showTransitions
        )}
        draggable="false"
        onMouseOver={() => setShowOptions(true)}
        onMouseOut={() => setShowOptions(false)}
      >
        <img
          className={"elementImage"}
          src={require(`../../assets/Images/${el.type}/${elementTypeInfo.Image}`)}
          //To avoid the default HTML5 drag API
          draggable="false"
          alt=""
          // onMouseEnter={() => setShowTransitions(false)}
        />

        <div
          className={`options ${showOptions ? "show" : ""} `}
          draggable="false"
        >
          <p>R</p>
          <p onClick={() => deletePBElement("index", index)}>X</p>
        </div>

        <div className="borderSquare" draggable="false"></div>
      </div>
    </Draggable>
  );
};

export { PBElement };
