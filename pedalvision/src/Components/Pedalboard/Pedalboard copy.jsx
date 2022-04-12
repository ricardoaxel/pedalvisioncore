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
  hideOptions,
  availableWidth,
}) => {
  const ref = useRef("");
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

  let pbAreaResponsiveWidth = ref.current.clientWidth;

  useEffect(() => {
    if (fitToView) {
      // console.log(
      //   ref.current.scrollWidth,
      //   ref.current.offsetWidth,
      //   ref.current.clientWidth
      // );
      if (hideOptions) {
        setScale(fullBodyWidth / pbAreaSize.width);
      } else {
        setScale(pbAreaResponsiveWidth / pbAreaSize.width);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitToView, pbAreaSize.width, pbAreaResponsiveWidth, hideOptions]);

  // useEffect(() => {
  //   if (pbAreaResponsiveWidth !== undefined) {
  //     console.log("entrando");
  //     if (hideOptions) {
  //       setScale(availableWidth / pbAreaSize.width);
  //     } else {
  //       setScale((availableWidth * 0.8) / pbAreaSize.width);
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hideOptions]);

  return (
    <div
      css={Style(pbAreaSize.width, pbAreaSize.height, scale)}
      className={className}
      ref={ref}
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
            >
              <img
                css={pedalStyle(
                  elementTypeInfo.width,
                  elementTypeInfo.Height,
                  scale
                )}
                src={require(`../../assets/Images/${el.type}/${elementTypeInfo.Image}`)}
                //To avoid the default HTML5 drag API
                draggable="false"
                alt=""
              />
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export { Pedalboard };
