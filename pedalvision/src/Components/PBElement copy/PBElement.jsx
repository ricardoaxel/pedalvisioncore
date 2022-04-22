import { Style } from "./PBElement.css";
import React from "react";
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
  updateElementLayer,
}) => {
  return (
    <Draggable
      position={{
        x: el.x,
        y: el.y,
      }}
      key={index}
      bounds="parent"
      onStop={(e, data) => handleEvent(data, index)}
      onStart={() => setShowTransitions(false)}
      onDrag={() => setShowTransitions(false)}
      draggable="false"
      scale={1}
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
      >
        <img
          className={"elementImage"}
          src={require(`../../assets/Images/${el.type}/${elementTypeInfo.Image}`)}
          //To avoid the default HTML5 drag API
          draggable="false"
          alt=""
        />

        <div className="borderSquare" draggable="false"></div>
        <div className={`options `} draggable="false">
          <p onClick={() => rotatePBElement("index", index, -90)}>{"<-"}</p>
          <p onClick={() => deletePBElement("index", index)}>X</p>
          <p onClick={() => rotatePBElement("index", index, 90)}>{"->"}</p>
        </div>

        <div className={`layer `} draggable="false">
          <p onClick={() => updateElementLayer("index", index, 1)}>{"A"}</p>
          <p>{el.layer}</p>
          <p onClick={() => updateElementLayer("index", index, -1)}>{"V"}</p>
        </div>
      </div>
    </Draggable>
  );
};

export { PBElement };
