import { Style, pedalStyle } from "./Pedalboard.css";
import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";

const Pedalboard = ({
  pedalboardData,
  setPedalboardData,
  className,
  scale,
  setScale,
  pbAreaSize,
  fitToView,
  availableWidth,
  showTransitions,
  setShowTransitions,
}) => {
  const handleEvent = (data, index) => {
    let auxObj = {
      ...pedalboardData[index],
      x: data.lastX,
      y: data.lastY,
    };
    let auxElements = [...pedalboardData];
    auxElements[index] = auxObj;
    setPedalboardData(auxElements);
  };

  useEffect(() => {
    if (fitToView) {
      // console.log(
      //   ref.current.scrollWidth,
      //   ref.current.offsetWidth,
      //   ref.current.clientWidth
      // );
      setScale(availableWidth / pbAreaSize.width);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitToView, pbAreaSize.width, availableWidth]);

  return (
    <div
      css={Style(pbAreaSize.width, pbAreaSize.height, scale)}
      className={className}
      // onMouseLeave={() => setShowTransitions(true)}
    >
      <div className="pedalboardAreaContainer">
        {pedalboardData.map((el, index) => {
          let elementTypeInfo;
          if (el.type === "pedals") {
            elementTypeInfo = pedals.filter(
              (pedal) => pedal.Name === el.Name && pedal.Brand === el.Brand
            )[0];
          } else {
            elementTypeInfo = pedalboards.filter(
              (pedal) => pedal.Name === el.Name && pedal.Brand === el.Brand
            )[0];
          }

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
            >
              <img
                css={pedalStyle(
                  elementTypeInfo.width,
                  elementTypeInfo.Height,
                  scale,
                  false,
                  showTransitions
                )}
                src={require(`../../assets/Images/${el.type}/${elementTypeInfo.Image}`)}
                //To avoid the default HTML5 drag API
                draggable="false"
                alt=""
                // onMouseEnter={() => setShowTransitions(false)}
              />
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export { Pedalboard };
