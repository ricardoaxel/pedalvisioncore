import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../PBElementDrag/PBElement";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

const ItemTypes = {
  BOX: "box",
};
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
    setPbScrollBarSize({
      width: localRef.current.offsetWidth - localRef.current.clientWidth,
      height: localRef.current.offsetHeight - localRef.current.clientHeight,
    });
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

  //////////////////

  ///////////////
  ////////////////////////////////////////////////////
  // const [boxes, setBoxes] = useState({
  //   c: {
  //     id: "pedalsid1",
  //     top: 0,
  //     left: 0,
  //     type: "pedals",
  //     elementID: "rat",
  //     Brand: "Pro Co",
  //     Name: "Rat",
  //     orientation: "0",
  //     layer: 1,
  //   },
  // });

  const moveBox = useCallback(
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
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
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
          pbAreaSize.height * scale + 1 <= localRef.current.clientHeight
      )}
      className={className}
      ref={localRef}
    >
      <div
        ref={drop}
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
              deletePBElement={deletePBElement}
              rotatePBElement={rotatePBElement}
              updateElementLayer={updateElementLayer}
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
