import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect, useCallback } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../../Components";
import {
  deletePBElement,
  escFunction,
  rotatePBElement,
  updateElementLayer,
} from "./functions";
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

  useEffect(() => {
    setPbScrollBarSize({
      width: localRef.current.offsetWidth - localRef.current.clientWidth,
      height: localRef.current.offsetHeight - localRef.current.clientHeight,
    });

    document.addEventListener(
      "keydown",
      (e) => escFunction(e, actualElement, setPedalboardData),
      false
    );
  }, []);

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
      <div
        ref={drop}
        className="pedalboardAreaContainer"
        id="pedalboardAreaContainer"
      >
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
              rotatePBElement={(id, deg) =>
                rotatePBElement(
                  id,
                  deg,
                  pedalboardData,
                  scale,
                  pbAreaSize,
                  setPbAreaSize,
                  setPedalboardData
                )
              }
              deletePBElement={() =>
                deletePBElement(key, pedalboardData, setPedalboardData)
              }
              updateElementLayer={(id, num) =>
                updateElementLayer(id, num, pedalboardData, setPedalboardData)
              }
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
