import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../PBElement/PBElement";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions2";

const Pedalboard = ({
  pedalboardData,
  setPedalboardData,
  className,
  scale,
  pbAreaSize,
  showTransitions,
  setShowTransitions,
  setPbScrollBarSize,
  setPbAreaSize,
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
    let abortController = new AbortController();
    setPbScrollBarSize({
      width: localRef.current.offsetWidth - localRef.current.clientWidth,
      height: localRef.current.offsetHeight - localRef.current.clientHeight,
    });
    return () => {
      abortController.abort();
    };
    // setPBLoaded(true);
  }, []);

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

      let auxSize = {
        width: getLatestPositions(pedalboardData, scale, "width") / scale + 1,
        height: getLatestPositions(pedalboardData, scale, "height") / scale + 1,
      };
      setPbAreaSize({
        width:
          pbAreaSize.width > auxSize.width ? pbAreaSize.width : auxSize.width,
        height:
          pbAreaSize.height > auxSize.height
            ? pbAreaSize.height
            : auxSize.height,
      });
      setPedalboardData([...auxPB]);
    }
  };

  const updateElementLayer = (type, id, num) => {
    if (type === "index") {
      let auxPB = [...pedalboardData];
      let newNum = parseInt(auxPB[id]["layer"]) + num;
      auxPB[id]["layer"] = newNum < 1 ? 1 : newNum > 10 ? 10 : newNum;
      setPedalboardData([...auxPB]);
    }
  };

  return (
    <div
      css={Style(
        pbAreaSize.width,
        pbAreaSize.height,
        scale,
        localRef.current &&
          pbAreaSize.width * scale + 1 < localRef.current.clientWidth &&
          localRef.current &&
          pbAreaSize.height * scale + 1 <= localRef.current.clientHeight
      )}
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
              key={el.id}
              index={index}
              elementTypeInfo={elementTypeInfo}
              scale={scale}
              showTransitions={showTransitions}
              handleEvent={handleEvent}
              setShowTransitions={setShowTransitions}
              deletePBElement={deletePBElement}
              rotatePBElement={rotatePBElement}
              updateElementLayer={updateElementLayer}
            />
          );
        })}
      </div>
    </div>
  );
};

export { Pedalboard };
