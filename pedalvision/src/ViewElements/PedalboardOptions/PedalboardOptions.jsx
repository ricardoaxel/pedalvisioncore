import { Style } from "./PedalboardOptions.css";
import React, { useState } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import {
  addElement,
  changeLayoutSize,
  adjustLayoutToElements,
} from "./functions";
import { CanvasOptions } from "../CanvasOptions";
import { AddElements } from "../AddElements/AddElements";

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
      }}
      onClick={() => setShowTransitions(true)}
    >
      <div className="optionsSection">
        <CanvasOptions
          setPbAreaSize={setPbAreaSize}
          pedalboardData={pedalboardData}
          scale={scale}
          unitFactor={unitFactor}
          pbAreaSize={pbAreaSize}
          setUnitFactor={setUnitFactor}
          setScale={(e) => setScale(parseFloat(e))}
          fitToHeight={fitToHeight}
          fitToWidth={fitToWidth}
          htmlDrag={htmlDrag}
          setHtmlDrag={setHtmlDrag}
          setFitToHeight={setFitToHeight}
          setFitToWidth={setFitToWidth}
          fillEmptySpace={fillEmptySpace}
          autofillEmpty={autofillEmpty}
          setAutofillEmpty={setAutofillEmpty}
        />
        <AddElements
          addElement={addElement}
          pedalboardData={pedalboardData}
          pbAreaSize={pbAreaSize}
          scale={scale}
          setPbAreaSize={setPbAreaSize}
          setPedalboardData={setPedalboardData}
          htmlDrag={htmlDrag}
        />
        {/* {(!hideElements || htmlDrag) && (
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
        )} */}
      </div>
      <div className="toggleBtn" onClick={() => setHideOptions(!hideOptions)}>
        {">"}
      </div>
    </div>
  );
};
