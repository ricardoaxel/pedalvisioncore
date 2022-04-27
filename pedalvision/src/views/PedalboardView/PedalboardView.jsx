import { useState, useEffect, useRef } from "react";
import { Pedalboard } from "../../aComponentsLegacy/Pedalboard";
import { PedalboardOptions } from "../../aComponentsLegacy/PedalboardOptions/PedalboardOptions";
import { exampleData } from "./exampleData";
import { Style } from "./PedalboardView.css";
import { useWindowSize } from "../../Hooks";

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

  useEffect(() => {
    localStorage.setItem("pedalboardData", JSON.stringify(pedalboardData));
  }, [pedalboardData]);

  //Local storage saving
  useEffect(() => {
    localStorage.setItem("pbAreaSize", JSON.stringify(pbAreaSize));
  }, [pbAreaSize]);

  useEffect(() => {
    localStorage.setItem("scale", JSON.stringify(scale));
  }, [scale]);

  //Temporary options
  const [fitToView, setFitToView] = useState(false);
  const [hideOptions, setHideOptions] = useState(false);
  const [showTransitions, setShowTransitions] = useState(false);
  const [pbScrollBarSize, setPbScrollBarSize] = useState({
    width: 0,
    height: 0,
  });
  const [autofillEmpty, setAutofillEmpty] = useState(false);

  //We send the available dimensions to the child from here to have it before in case of
  //calculating percentages and animations
  let availableWidth =
    windowSize !== undefined
      ? hideOptions
        ? windowSize.width
        : windowSize.width * 0.8
      : "";

  let availableHeight = windowSize !== undefined ? windowSize.height - 50 : "";

  useEffect(() => {
    if (fitToView) {
      preSetScale((availableWidth - pbScrollBarSize.width) / pbAreaSize.width);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitToView, pbAreaSize.width, availableWidth]);

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
    let auxelems = [...pedalboardData].map((el) => ({
      ...el,
      x: (el.x * newScale) / scale,
      y: (el.y * newScale) / scale,
    }));
    localStorage.setItem("scale", JSON.stringify(newScale));
    setPedalboardData([...auxelems]);
    setScale(newScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <div css={Style(hideOptions)} ref={bodyRef}>
      <div className="headSec">Head</div>
      <div className="bodySec">
        <div className="pbZone">
          <Pedalboard
            className={""}
            pedalboardData={pedalboardData}
            setPedalboardData={setPedalboardData}
            scale={scale}
            setScale={preSetScale}
            pbAreaSize={pbAreaSize}
            availableWidth={availableWidth}
            availableHeight={availableHeight}
            showTransitions={showTransitions}
            setShowTransitions={setShowTransitions}
            setPbScrollBarSize={setPbScrollBarSize}
            windowSize={windowSize}
            setPbAreaSize={setPbAreaSize}
          />
        </div>
        <PedalboardOptions
          className={"pbOptions"}
          pedalboardData={pedalboardData}
          setPedalboardData={(data) => setPedalboardData(data)}
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
        />
      </div>
    </div>
  );
};
