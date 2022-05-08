import { Style } from "./PedalboardOptions.css";
import React, { useState } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";
import {
  addElement,
  changeLayoutSize,
  adjustLayoutToElements,
} from "./functions";

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
  const [hideElements, setHideElements] = useState(true);

  const preAdjustLayoutToElements = (type = "both") => {
    adjustLayoutToElements(
      type,
      setPbAreaSize,
      pedalboardData,
      scale,
      unitFactor,
      pbAreaSize
    );
  };

  const preChangeLayoutSize = (value, type) => {
    changeLayoutSize(
      value / unitFactor,
      type,
      pedalboardData,
      scale,
      setPbAreaSize,
      pbAreaSize
    );
  };
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
        <button onClick={() => preAdjustLayoutToElements("both")}>Both</button>
        <button onClick={() => preAdjustLayoutToElements("width")}>
          Width
        </button>
        <button onClick={() => preAdjustLayoutToElements("height")}>
          Height
        </button>
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
            preChangeLayoutSize(e.target.value, "width");
          }}
        />
        <br />
        Height:
        <input
          type="number"
          name="lastName"
          value={(pbAreaSize.height * unitFactor).toFixed(2)}
          onChange={(e) => preChangeLayoutSize(e.target.value, "height")}
        />
        {(!hideElements || htmlDrag) && (
          <>
            <div className="elementSel">
              Pedalboards:
              <select
                onChange={(e) =>
                  addElement(
                    e.target.value,
                    "pedalboards",
                    pedalboardData,
                    pbAreaSize,
                    scale,
                    setPbAreaSize,
                    setPedalboardData
                  )
                }
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
              <select
                onChange={(e) =>
                  addElement(
                    e.target.value,
                    "pedals",
                    pedalboardData,
                    pbAreaSize,
                    scale,
                    setPbAreaSize,
                    setPedalboardData
                  )
                }
              >
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
