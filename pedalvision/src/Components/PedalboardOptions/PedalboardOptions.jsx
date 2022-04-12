import { Style } from "./PedalboardOptions.css";
import React from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";

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
  onMouseEnter,
  setShowTransitions,
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
    };
    let auxElements = [...pedalboardData, auxObj];
    setPedalboardData(auxElements);
  };

  const changeLayoutSize = (value, type) => {
    let maxOfType = Math.max(
      ...pedalboardData.map((el) => {
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

        if (type === "width") {
          return elementTypeInfo.Width * scale + el.x;
        } else {
          return elementTypeInfo.Height * scale + el.y;
        }
      })
    );
    if (value > maxOfType / scale) {
      setPbAreaSize({ ...pbAreaSize, [type]: value });
    }
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
