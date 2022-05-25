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
import { IoIosArrowForward, IoIosArrowBack, IoIosAdd } from "react-icons/io";
import { Images, simplebp } from "../../utils/GeneralImports";

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
  windowSize,
}) => {
  return (
    <div
      css={Style(hideOptions)}
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
          setPedalboardData={setPedalboardData}
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
      </div>
      <div className={`toggleBtn`} onClick={() => setHideOptions(!hideOptions)}>
        {windowSize.width > simplebp.phone || !hideOptions ? (
          <IoIosArrowForward className={`${hideOptions ? "turn" : ""}`} />
        ) : (
          <img src={Images.addPedal} />
        )}
      </div>
    </div>
  );
};
