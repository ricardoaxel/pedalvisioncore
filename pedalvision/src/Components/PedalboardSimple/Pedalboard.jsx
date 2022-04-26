import { Style, pedalStyle } from "./Pedalboard.css";
import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";

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
  setPbAreaSize,
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

  const deletePBElement = (type, id) => {
    if (type === "index") {
      setPedalboardData([
        ...pedalboardData.filter((pedalboardData, index) => index !== id),
      ]);
    } else {
    }
  };

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
              onStart={() => setShowTransitions(false)}
            >
              {/* <> */}
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
              {/* <div className={`options `} draggable="false">
                  <p onClick={() => rotatePBElement("index", index, -90)}>
                    {"<-"}
                  </p>
                  <p onClick={() => deletePBElement("index", index)}>X</p>
                  <p onClick={() => rotatePBElement("index", index, 90)}>
                    {"->"}
                  </p>
                </div>
              </> */}
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export { Pedalboard };
