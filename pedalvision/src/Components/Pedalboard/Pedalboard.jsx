import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../PBElement/PBElement";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

export const Pedalboard = ({
  className,
  scale,
  pbAreaSize,
  showTransitions,
  setShowTransitions,
  setPbScrollBarSize,
  setPbAreaSize,
  pedalboardData,
  setPedalboardData,
  actualElement,
  htmlDrag,
  unitFactor,
}) => {
  const localRef = useRef();
  const movePedal = (direction, num) => {
    let auxPB = { ...JSON.parse(localStorage.getItem("pedalboardData")) };
    if (
      auxPB[actualElement.current.id][direction] +
        num * JSON.parse(localStorage.getItem("scale")) <
      0
    ) {
      num = 0;
    }
    let isHorizontal =
      Math.abs(actualElement.current.particularInfo.orientation) === 0 ||
      Math.abs(actualElement.current.particularInfo.orientation) === 180;
    if (
      auxPB[actualElement.current.id][direction] +
        num * JSON.parse(localStorage.getItem("scale")) +
        actualElement.current.elTypeInfo[
          direction === "top"
            ? isHorizontal
              ? "Height"
              : "Width"
            : isHorizontal
            ? "Width"
            : "Height"
        ] *
          JSON.parse(localStorage.getItem("scale")) >
      JSON.parse(localStorage.getItem("pbAreaSize"))[
        direction === "top" ? "height" : "width"
      ] *
        JSON.parse(localStorage.getItem("scale"))
    ) {
      num = 0;
    }
    auxPB[actualElement.current.id][direction] =
      auxPB[actualElement.current.id][direction] +
      num * JSON.parse(localStorage.getItem("scale"));

    setPedalboardData({ ...auxPB });
  };

  const escFunction = (event) => {
    if (actualElement.current !== undefined) {
      switch (event.key) {
        case "ArrowLeft":
          movePedal("left", -1);
          break;
        case "ArrowRight":
          movePedal("left", 1);
          break;
        case "ArrowUp":
          movePedal("top", -1);
          break;
        case "ArrowDown":
          movePedal("top", 1);
          break;
        default:
          break;
      }
    }
  };
  useEffect(() => {
    setPbScrollBarSize({
      width: localRef.current.offsetWidth - localRef.current.clientWidth,
      height: localRef.current.offsetHeight - localRef.current.clientHeight,
    });

    document.addEventListener("keydown", escFunction, false);
  }, []);

  const deletePBElement = (id) => {
    let auxPBData = { ...pedalboardData };
    delete auxPBData[id];

    setPedalboardData({ ...auxPBData });
  };

  const rotatePBElement = (id, deg) => {
    let auxPB = { ...pedalboardData };
    auxPB[id]["orientation"] =
      parseInt(auxPB[id]["orientation"]) + deg >= 360 ||
      parseInt(auxPB[id]["orientation"]) + deg <= -360
        ? 0
        : parseInt(auxPB[id]["orientation"]) + deg;

    let auxSize = {
      width: getLatestPositions(auxPB, scale, "width") / scale + 1,
      height: getLatestPositions(auxPB, scale, "height") / scale + 1,
    };
    setPbAreaSize({
      width:
        pbAreaSize.width > auxSize.width ? pbAreaSize.width : auxSize.width,
      height:
        pbAreaSize.height > auxSize.height ? pbAreaSize.height : auxSize.height,
    });
    setPedalboardData({ ...auxPB });
  };

  const updateElementLayer = (id, num) => {
    let auxPB = { ...pedalboardData };
    let newNum = parseInt(auxPB[id]["layer"]) + num;
    auxPB[id]["layer"] = newNum < 1 ? 1 : newNum > 10 ? 10 : newNum;
    setPedalboardData({ ...auxPB });
  };

  const moveBox = useCallback(
    (id, left, top, elementTypeInfo) => {
      //Validations to avoid image traspasing available area
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }
      let isHorizontal =
        Math.abs(pedalboardData[id].orientation) === 0 ||
        Math.abs(pedalboardData[id].orientation) === 180;

      if (
        left + elementTypeInfo[isHorizontal ? "Width" : "Height"] * scale >
        pbAreaSize.width * scale
      ) {
        left =
          pbAreaSize.width * scale -
          elementTypeInfo[isHorizontal ? "Width" : "Height"] * scale;
      }
      if (
        top + elementTypeInfo[isHorizontal ? "Height" : "Width"] * scale >
        pbAreaSize.height * scale
      ) {
        top =
          pbAreaSize.height * scale -
          elementTypeInfo[isHorizontal ? "Height" : "Width"] * scale;
      }

      setPedalboardData(
        update(pedalboardData, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [pedalboardData]
  );
  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top, item.elementTypeInfo);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div
      css={Style(
        pbAreaSize.width,
        pbAreaSize.height,
        scale,
        localRef.current &&
          pbAreaSize.width * scale + 1 < localRef.current.clientWidth &&
          localRef.current &&
          pbAreaSize.height * scale + 1 <= localRef.current.clientHeight,
        unitFactor
      )}
      className={className}
      ref={localRef}
    >
      <div ref={drop} className="pedalboardAreaContainer">
        <div className="gridArea"></div>
        {Object.keys(pedalboardData).map((key) => {
          const { left, top, title } = pedalboardData[key];
          let locOtherData = pedalboardData[key];
          let elementTypeInfo;
          if (locOtherData.type === "pedals") {
            elementTypeInfo = pedals.filter(
              (pedal) =>
                pedal.Name === locOtherData.Name &&
                pedal.Brand === locOtherData.Brand
            )[0];
          } else {
            elementTypeInfo = pedalboards.filter(
              (pedal) =>
                pedal.Name === locOtherData.Name &&
                pedal.Brand === locOtherData.Brand
            )[0];
          }
          return (
            <PBElement
              key={key}
              id={key}
              left={left}
              top={top}
              hideSourceOnDrag={true}
              otherData={pedalboardData[key]}
              elementTypeInfo={elementTypeInfo}
              scale={scale}
              showTransitions={showTransitions}
              setShowTransitions={setShowTransitions}
              rotatePBElement={rotatePBElement}
              deletePBElement={deletePBElement}
              updateElementLayer={updateElementLayer}
              setActualElement={(val) => (actualElement.current = val)}
              htmlDrag={htmlDrag}
              handleEvent={moveBox}
            >
              {title}
            </PBElement>
          );
        })}
      </div>
    </div>
  );
};
