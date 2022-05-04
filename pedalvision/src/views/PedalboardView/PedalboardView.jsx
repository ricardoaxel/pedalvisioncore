import { useState, useEffect, useRef } from "react";
import { Pedalboard } from "../../Components/Pedalboard/Pedalboard";
import { PedalboardOptions } from "../../Components/PedalboardOptions/PedalboardOptions";
import { exampleData } from "./exampleData";
import { Style } from "./PedalboardView.css";
import { useWindowSize } from "../../Hooks";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

export const PedalboardView = () => {
  let windowSize = useWindowSize();
  const bodyRef = useRef();
  const [pedalboardData, setPedalboardData] = useState(
    JSON.parse(localStorage.getItem("pedalboardData"))
      ? JSON.parse(localStorage.getItem("pedalboardData"))
      : exampleData
  );
  const [scale, setScale] = useState(
    JSON.parse(localStorage.getItem("scale"))
      ? JSON.parse(localStorage.getItem("scale"))
      : 18
  );
  const [pbAreaSize, setPbAreaSize] = useState(
    JSON.parse(localStorage.getItem("pbAreaSize"))
      ? JSON.parse(localStorage.getItem("pbAreaSize"))
      : { width: 60, height: 30 }
  );
  const [htmlDrag, setHtmlDrag] = useState(true);
  //Temporary options
  const [fitToWidth, setFitToWidth] = useState(false);
  const [fitToHeight, setFitToHeight] = useState(false);
  const [hideOptions, setHideOptions] = useState(false);
  const [showTransitions, setShowTransitions] = useState(false);
  const [autofillEmpty, setAutofillEmpty] = useState(false);
  const [unitFactor, setUnitFactor] = useState("1");
  const [pbScrollBarSize, setPbScrollBarSize] = useState({
    width: 0,
    height: 0,
  });
  const actualElement = useRef();

  //We send the available dimensions to the child from here to have it before in case we need
  //to calculate percentages and animations
  let availableWidth =
    windowSize !== undefined
      ? hideOptions
        ? windowSize.width
        : windowSize.width * 0.8
      : "";
  let availableHeight = windowSize !== undefined ? windowSize.height - 50 : "";

  const preSetScale = (newScale) => {
    // When the scale changes the elements positions are recalculated
    let aux2 = { ...pedalboardData };
    Object.keys(pedalboardData).map((key) => {
      aux2[key].left = (aux2[key].left * newScale) / scale;
      aux2[key].top = (aux2[key].top * newScale) / scale;
    });
    localStorage.setItem("scale", JSON.stringify(newScale));
    setPedalboardData(aux2);
    setScale(newScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  //Local storage saving
  useEffect(() => {
    localStorage.setItem("pbAreaSize", JSON.stringify(pbAreaSize));
  }, [pbAreaSize]);
  useEffect(() => {
    localStorage.setItem("pedalboardData", JSON.stringify(pedalboardData));
  }, [pedalboardData]);
  useEffect(() => {
    localStorage.setItem("scale", JSON.stringify(scale));
  }, [scale]);

  //Effects
  useEffect(() => {
    if (fitToWidth) {
      preSetScale((availableWidth - pbScrollBarSize.width) / pbAreaSize.width);
    }
    if (fitToHeight) {
      preSetScale(
        (availableHeight - pbScrollBarSize.height) / pbAreaSize.height
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fitToWidth,
    fitToHeight,
    pbAreaSize.width,
    availableWidth,
    pbAreaSize.height,
    availableHeight,
  ]);

  useEffect(() => {
    if (autofillEmpty) {
      if (fitToWidth) {
        setPbAreaSize({
          ...pbAreaSize,
          height:
            true && pbAreaSize.height < availableHeight / scale
              ? availableHeight / scale - pbScrollBarSize.height / scale
              : pbAreaSize.height,
        });
      } else {
        setPbAreaSize({
          width:
            true && pbAreaSize.width < availableWidth / scale
              ? availableWidth / scale - pbScrollBarSize.width / scale
              : pbAreaSize.width,
          height:
            true && pbAreaSize.height < availableHeight / scale
              ? availableHeight / scale - pbScrollBarSize.height / scale
              : pbAreaSize.height,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableWidth]);

  useEffect(() => {
    if (autofillEmpty) {
      fillEmptySpace();
    }
  }, [scale, autofillEmpty]);
  return (
    <div css={Style(hideOptions)} ref={bodyRef}>
      <div className="headSec">Head</div>
      <div className="bodySec">
        <div className="pbZone">
          <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <Pedalboard
              className={""}
              scale={scale}
              pbAreaSize={pbAreaSize}
              showTransitions={showTransitions}
              setShowTransitions={setShowTransitions}
              setPbScrollBarSize={setPbScrollBarSize}
              setPbAreaSize={setPbAreaSize}
              pedalboardData={pedalboardData}
              availableWidth={availableWidth}
              availableHeight={availableHeight}
              setPedalboardData={setPedalboardData}
              actualElement={actualElement}
              htmlDrag={htmlDrag}
              unitFactor={unitFactor}
            />
          </DndProvider>
        </div>
        <PedalboardOptions
          className={"pbOptions"}
          scale={scale}
          setScale={preSetScale}
          pbAreaSize={pbAreaSize}
          setPbAreaSize={setPbAreaSize}
          fitToWidth={fitToWidth}
          setFitToWidth={setFitToWidth}
          fitToHeight={fitToHeight}
          setFitToHeight={setFitToHeight}
          hideOptions={hideOptions}
          setHideOptions={setHideOptions}
          setShowTransitions={setShowTransitions}
          autofillEmpty={autofillEmpty}
          setAutofillEmpty={setAutofillEmpty}
          pedalboardData={pedalboardData}
          setPedalboardData={setPedalboardData}
          htmlDrag={htmlDrag}
          setHtmlDrag={setHtmlDrag}
          fillEmptySpace={fillEmptySpace}
          unitFactor={unitFactor}
          setUnitFactor={setUnitFactor}
          actualElement={actualElement}
        />
      </div>
    </div>
  );
};
