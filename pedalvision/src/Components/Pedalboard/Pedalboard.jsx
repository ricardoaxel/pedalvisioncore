import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../PBElement/PBElement";

const Pedalboard = ({
  pedalboardData,
  setPedalboardData,
  className,
  scale,
  pbAreaSize,
  fitToView,
  availableWidth,
  setAvailableHeight,
  showTransitions,
  setShowTransitions,
  setPbScrollBarSize,
  windowSize,
}) => {
  const localRef = useRef();
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
    setAvailableHeight(localRef.current.offsetHeight);
  }, [windowSize]);

  useEffect(() => {
    setPbScrollBarSize({
      width: localRef.current.offsetWidth - localRef.current.clientWidth,
      height: localRef.current.offsetHeight - localRef.current.clientHeight,
    });
  }, [availableWidth, pbAreaSize]);

  const deletePBElement = (type, id) => {
    if (type === "index") {
      setPedalboardData([
        ...pedalboardData.filter((pedalboardData, index) => index !== id),
      ]);
    } else {
    }
  };

  const rotatePBElement = (type, id, deg) => {
    if (type === "index") {
      let auxPB = [...pedalboardData];
      auxPB[id]["orientation"] =
        parseInt(auxPB[id]["orientation"]) + deg >= 360 ||
        parseInt(auxPB[id]["orientation"]) + deg <= -360
          ? 0
          : parseInt(auxPB[id]["orientation"]) + deg;

      setPedalboardData([...auxPB]);
    } else {
    }
  };

  return (
    <div
      css={Style(pbAreaSize.width, pbAreaSize.height, scale, fitToView)}
      className={className}
      ref={localRef}
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
            <PBElement
              el={el}
              index={index}
              elementTypeInfo={elementTypeInfo}
              scale={scale}
              showTransitions={showTransitions}
              handleEvent={handleEvent}
              setShowTransitions={setShowTransitions}
              deletePBElement={deletePBElement}
              rotatePBElement={rotatePBElement}
            />
          );
        })}
      </div>
    </div>
  );
};

export { Pedalboard };
