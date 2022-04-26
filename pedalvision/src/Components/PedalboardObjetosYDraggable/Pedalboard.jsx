import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../PBElementObjetosYDraggable/PBElement";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";
import update from "immutability-helper";

export const Pedalboard = ({
  pedalboardData,
  setPedalboardData,
  className,
  scale,
  pbAreaSize,
  showTransitions,
  setShowTransitions,
  setPbScrollBarSize,
  setPbAreaSize,
  boxes,
  setBoxes,
}) => {
  const localRef = useRef();
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

  const handleEvent = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
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
          pbAreaSize.height * scale + 1 <= localRef.current.clientHeight
      )}
      className={className}
      ref={localRef}
    >
      <div
        // ref={drop}
        className="pedalboardAreaContainer"
        // style={styles}
      >
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key];
          let locOtherData = boxes[key];
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
              otherData={boxes[key]}
              elementTypeInfo={elementTypeInfo}
              scale={scale}
              showTransitions={showTransitions}
              setShowTransitions={setShowTransitions}
              // deletePBElement={deletePBElement}
              // rotatePBElement={rotatePBElement}
              // updateElementLayer={updateElementLayer}
              handleEvent={handleEvent}
            >
              {title}
            </PBElement>
          );
        })}
        {/* {pedalboardData.map((el, index) => {
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
              id={el.id}
              left={el.x}
              top={el.y}
            />
          );
        })} */}
      </div>
    </div>
  );
};
