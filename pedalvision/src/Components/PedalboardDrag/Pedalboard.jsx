import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../PBElement/PBElement";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { Box } from "./Box";

const styles = {
  width: 300,
  height: 300,
  border: "1px solid black",
  position: "relative",
};
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
}) => {
  const localRef = useRef();
  useEffect(() => {
    setPbScrollBarSize({
      width: localRef.current.offsetWidth - localRef.current.clientWidth,
      height: localRef.current.offsetHeight - localRef.current.clientHeight,
    });
    // setPBLoaded(true);
  }, []);

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
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });
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
        {/* {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key];
          return (
            <Box
              key={key}
              id={key}
              left={left}
              top={top}
              hideSourceOnDrag={true}
            >
              {title}
            </Box>
          );
        })} */}
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
