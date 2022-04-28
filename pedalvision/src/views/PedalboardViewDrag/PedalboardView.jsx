import { useState, useEffect, useRef } from "react";
import { Pedalboard } from "../../Components/PedalboardDrag/Pedalboard";
import { PedalboardOptions } from "../../Components/PedalboardOptionsDrag/PedalboardOptions";
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
  const [fitToView, setFitToView] = useState(false);
  const [hideOptions, setHideOptions] = useState(false);
  const [showTransitions, setShowTransitions] = useState(false);
  const [pbScrollBarSize, setPbScrollBarSize] = useState({
    width: 0,
    height: 0,
  });
  const [autofillEmpty, setAutofillEmpty] = useState(false);
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

  useEffect(() => {
    localStorage.setItem("scale", JSON.stringify(scale));
  }, [scale]);

  //Local storage saving
  useEffect(() => {
    localStorage.setItem("pbAreaSize", JSON.stringify(pbAreaSize));
  }, [pbAreaSize]);
  useEffect(() => {
    if (fitToView) {
      preSetScale((availableWidth - pbScrollBarSize.width) / pbAreaSize.width);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitToView, pbAreaSize.width, availableWidth]);
  useEffect(() => {
    localStorage.setItem("pedalboardData", JSON.stringify(pedalboardData));
  }, [pedalboardData]);

  useEffect(() => {
    if (autofillEmpty) {
      if (fitToView) {
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
              availableWidth={availableWidth}
              availableHeight={availableHeight}
              pedalboardData={pedalboardData}
              setPedalboardData={setPedalboardData}
              actualElement={actualElement}
              htmlDrag={htmlDrag}
            />
          </DndProvider>
        </div>
        <PedalboardOptions
          className={"pbOptions"}
          scale={scale}
          setScale={preSetScale}
          pbAreaSize={pbAreaSize}
          setPbAreaSize={setPbAreaSize}
          fitToView={fitToView}
          setFitToView={setFitToView}
          hideOptions={hideOptions}
          setHideOptions={setHideOptions}
          setShowTransitions={setShowTransitions}
          pbScrollBarSize={pbScrollBarSize}
          availableWidth={availableWidth}
          availableHeight={availableHeight}
          setAutofillEmpty={setAutofillEmpty}
          autofillEmpty={autofillEmpty}
          pedalboardData={pedalboardData}
          setPedalboardData={setPedalboardData}
          actualElement={actualElement}
          htmlDrag={htmlDrag}
          setHtmlDrag={setHtmlDrag}
        />
      </div>
    </div>
  );
};
