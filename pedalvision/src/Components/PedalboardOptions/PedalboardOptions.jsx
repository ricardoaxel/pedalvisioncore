import { Style } from "./PedalboardOptions.css";
import React from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";

export const PedalboardOptions = ({
  className,
  pedalboardData,
  setPedalboardData,
  scale,
  setScale,
  pbAreaSize,
  setPbAreaSize,
  fitToView,
  setFitToView,
  hideOptions,
  setHideOptions,
  setShowTransitions,
  availableWidth,
  availableHeight,
  pbScrollBarSize,
  setAutofillEmpty,
  autofillEmpty,
}) => {
  const addElement = (elementIndex, type) => {
    let elementTypeInfo;
    if (type === "pedals") {
      elementTypeInfo = pedals[elementIndex];
    } else {
      elementTypeInfo = pedalboards[elementIndex];
    }

    let auxObj = {
      id: "id" + Math.random().toString(16).slice(2),
      x: 0,
      y: 0,
      type: type,
      Name: elementTypeInfo.Name,
      Brand: elementTypeInfo.Brand,
      orientation: 0,
      //Obtaining the last layer
      layer: Math.max(...pedalboardData.map((el) => el.layer)),
    };

    //This validation change the size of the actual area to work in case the element doesn't fit
    let auxElements = [...pedalboardData, auxObj];
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
    setPedalboardData(auxElements);
  };

  const changeLayoutSize = (value, type) => {
    let maxOfType = getLatestPositions(pedalboardData, scale, type);
    if (value > maxOfType / scale) {
      setPbAreaSize({ ...pbAreaSize, [type]: value });
    }
  };

  const adjustLayoutToElements = (type = "both") => {
    setPbAreaSize({
      width:
        type === "width" || type === "both"
          ? getLatestPositions(pedalboardData, scale, "width") / scale + 1
          : pbAreaSize.width,
      height:
        type === "height" || type === "both"
          ? getLatestPositions(pedalboardData, scale, "height") / scale + 1
          : pbAreaSize.height,
    });
  };

  const fillEmptySpace = (type = "both") => {
    setPbAreaSize({
      width:
        (type === "width" || type === "both") &&
        pbAreaSize.width < availableWidth / scale
          ? availableWidth / scale - pbScrollBarSize.width / scale
          : pbAreaSize.width,
      height:
        (type === "height" || type === "both") &&
        pbAreaSize.height < availableHeight / scale
          ? availableHeight / scale - pbScrollBarSize.height / scale
          : pbAreaSize.height,
    });
  };

  const callAutoFillEmpty = () => {
    if (!autofillEmpty) {
      fillEmptySpace();
    }
    setAutofillEmpty(!autofillEmpty);
  };

  return (
    <div
      css={Style()}
      className={className}
      onMouseEnter={() => setShowTransitions(true)}
      onClick={() => setShowTransitions(true)}
    >
      <div className="elementsAddSection">
        <label>
          <input
            type="checkbox"
            value={fitToView}
            onChange={() => setFitToView(!fitToView)}
          />{" "}
          Fit to View
        </label>
        <br />
        Scale (representation of inches per pixel):{scale}
        <input
          type="number"
          name="lastName"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          disabled={fitToView}
        />
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
            onChange={() => callAutoFillEmpty()}
          />{" "}
          Autofill empty space
          <br />
        </label>
        Width:
        <input
          type="number"
          name="lastName"
          value={pbAreaSize.width}
          onChange={(e) => changeLayoutSize(e.target.value, "width")}
        />
        <br />
        Height:
        <input
          type="number"
          name="lastName"
          value={pbAreaSize.height}
          onChange={(e) => changeLayoutSize(e.target.value, "height")}
        />
        <div className="elementSel">
          Pedalboards:
          <select onChange={(e) => addElement(e.target.value, "pedalboards")}>
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
      </div>
      <div className="toggleBtn" onClick={() => setHideOptions(!hideOptions)}>
        {">"}
      </div>
    </div>
  );
};
