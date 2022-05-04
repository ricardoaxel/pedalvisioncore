import { Style } from "./PedalboardOptions.css";
import React, { useState } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";

export const PedalboardOptions = ({
  className,
  scale,
  setScale,
  pbAreaSize,
  setPbAreaSize,
  fitToWidth,
  setFitToWidth,
  fitToHeight,
  setFitToHeight,
  hideOptions,
  setHideOptions,
  setShowTransitions,
  autofillEmpty,
  setAutofillEmpty,
  pedalboardData,
  setPedalboardData,
  htmlDrag,
  setHtmlDrag,
  fillEmptySpace,
  unitFactor,
  setUnitFactor,
}) => {
  const addElement = (elementIndex, type) => {
    let elementTypeInfo;
    if (type === "pedals") {
      elementTypeInfo = pedals[elementIndex];
    } else {
      elementTypeInfo = pedalboards[elementIndex];
    }
    let auxObj = {
      left: 0,
      top: 0,
      type: type,
      Name: elementTypeInfo.Name,
      Brand: elementTypeInfo.Brand,
      orientation: 0,
      //Obtaining the last layer
      layer: Math.max(...Object.values(pedalboardData).map((el) => el.layer)),
    };
    //This validation change the size of the actual area to work in case the element doesn't fit
    let auxPB = { ...pedalboardData };
    auxPB[Math.random().toString(16).slice(2)] = auxObj;
    let changeSize = false;
    let auxNewSize = { ...pbAreaSize };
    if (elementTypeInfo.Width * scale + 5 > pbAreaSize.width * scale) {
      auxNewSize = {
        ...auxNewSize,
        width: elementTypeInfo.Width + 10,
      };
      changeSize = true;
    }
    if (elementTypeInfo.Height * scale + 5 > pbAreaSize.height * scale) {
      auxNewSize = {
        ...auxNewSize,
        height: elementTypeInfo.Height + 10,
      };
      changeSize = true;
    }
    if (changeSize) {
      setPbAreaSize(auxNewSize);
    }
    setPedalboardData(auxPB);
  };

  const changeLayoutSize = (value, type) => {
    let maxOfType = getLatestPositions(pedalboardData, scale, type);
    if (value > maxOfType / scale) {
      setPbAreaSize({ ...pbAreaSize, [type]: value });
    }
  };

  const adjustLayoutToElements = (type = "both") => {
    //The use of unitFactor is to adjust to the actual type of units
    setPbAreaSize({
      width:
        type === "width" || type === "both"
          ? Math.floor(
              (getLatestPositions(pedalboardData, scale, "width") / scale + 1) *
                unitFactor
            ) / unitFactor
          : pbAreaSize.width,
      height:
        type === "height" || type === "both"
          ? Math.floor(
              (getLatestPositions(pedalboardData, scale, "height") / scale +
                1) *
                unitFactor
            ) / unitFactor
          : pbAreaSize.height,
    });
  };
  const [hideElements, setHideElements] = useState(true);
  return (
    <div
      css={Style()}
      className={className}
      onMouseEnter={() => {
        setShowTransitions(true);
        setHideElements(false);
      }}
      onClick={() => setShowTransitions(true)}
      onMouseLeave={() => setHideElements(true)}
    >
      <div className="elementsAddSection">
        <label>
          <input
            type="checkbox"
            checked={htmlDrag}
            onChange={() => setHtmlDrag(!htmlDrag)}
          />{" "}
          HTML 5 Dnd
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={fitToWidth}
            onChange={() => {
              setFitToWidth(!fitToWidth);
              setFitToHeight(false);
            }}
          />{" "}
          Fit to View width
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={fitToHeight}
            onChange={() => {
              setFitToHeight(!fitToHeight);
              setFitToWidth(false);
            }}
          />{" "}
          Fit to View height
        </label>
        <br />
        Scale (representation of inches per pixel):{scale}
        <input
          type="number"
          name="lastName"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          disabled={fitToWidth || fitToHeight}
        />
        <br />
        Units:{scale}
        <br />
        <label>
          <input
            type="checkbox"
            checked={unitFactor === "1"}
            onChange={() => setUnitFactor("1")}
          />{" "}
          in
        </label>
        <label>
          <input
            type="checkbox"
            checked={unitFactor === "2.54"}
            onChange={() => setUnitFactor("2.54")}
          />{" "}
          cm
        </label>
        <br />
        Layout size: <br />
        Adjust to last elements:
        <br />
        <button onClick={() => adjustLayoutToElements()}>Both</button>
        <button onClick={() => adjustLayoutToElements("width")}>Width</button>
        <button onClick={() => adjustLayoutToElements("height")}>Height</button>
        <br />
        Fill empty space:
        <br />
        <button onClick={() => fillEmptySpace()}>Both</button>
        <button onClick={() => fillEmptySpace("width")}>Width</button>
        <button onClick={() => fillEmptySpace("height")}>Height</button>
        <br />
        <label>
          <input
            type="checkbox"
            value={autofillEmpty}
            onChange={() => setAutofillEmpty(!autofillEmpty)}
          />{" "}
          Autofill empty space
          <br />
        </label>
        Width:
        <input
          type="number"
          name="lastName"
          value={(pbAreaSize.width * unitFactor).toFixed(2)}
          onChange={(e) => {
            changeLayoutSize(e.target.value / unitFactor, "width");
          }}
        />
        <br />
        Height:
        <input
          type="number"
          name="lastName"
          value={(pbAreaSize.height * unitFactor).toFixed(2)}
          onChange={(e) =>
            changeLayoutSize(e.target.value / unitFactor, "height")
          }
        />
        {(!hideElements || htmlDrag) && (
          <>
            <div className="elementSel">
              Pedalboards:
              <select
                onChange={(e) => addElement(e.target.value, "pedalboards")}
              >
                {pedalboards.map((pedalboard, index) => (
                  <option key={index} value={index}>
                    {pedalboard.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="elementSel">
              Pedals:
              <select onChange={(e) => addElement(e.target.value, "pedals")}>
                {pedals.map((pedal, index) => (
                  <option key={index} value={index}>
                    {pedal.Name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
      <div className="toggleBtn" onClick={() => setHideOptions(!hideOptions)}>
        {">"}
      </div>
    </div>
  );
};
