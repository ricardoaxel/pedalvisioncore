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
  rotatePBElement,
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
          showTransitions,
          el
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
          onMouseOut={() => {
            setShowOptions(false);
          }}
        />

        <div className="borderSquare" draggable="false">
          <div
            className={`options ${showOptions ? "show" : ""} `}
            draggable="false"
            onMouseOver={() => setShowTransitions(true)}
          >
            <p onClick={() => rotatePBElement("index", index, -90)}>{"<-"}</p>
            <p onClick={() => deletePBElement("index", index)}>X</p>
            <p onClick={() => rotatePBElement("index", index, 90)}>{"->"}</p>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export { PBElement };
