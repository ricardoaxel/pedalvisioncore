import { useState, useEffect, useRef } from "react";
import { Pedalboard } from "../../Components/Pedalboard";
import { PedalboardOptions } from "../../Components/PedalboardOptions/PedalboardOptions";
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
  const [lastScale, setLastScale] = useState(
    JSON.parse(localStorage.getItem("scale"))
      ? JSON.parse(localStorage.getItem("scale"))
      : 18
  );
  const [scale, setScale] = useState(
    JSON.parse(localStorage.getItem("scale"))
      ? JSON.parse(localStorage.getItem("scale"))
      : 18
  );
  const [pbAreaSize, setPbAreaSize] = useState(
    JSON.parse(localStorage.getItem("scale"))
      ? JSON.parse(localStorage.getItem("pbAreaSize"))
      : { width: 60, height: 30 }
  );

  //Temporary options
  const [fitToView, setFitToView] = useState(false);
  const [hideOptions, setHideOptions] = useState(false);
  const [showTransitions, setShowTransitions] = useState(false);
  const [pbScrollBarSize, setPbScrollBarSize] = useState({
    width: 0,
    height: 0,
  });
  const [autofillEmpty, setAutofillEmpty] = useState(false);

  useEffect(() => {
    // When the scale changes the elements positions are recalculated
    let auxelems = pedalboardData.map((el) => ({
      ...el,
      x: (el.x * scale) / lastScale,
      y: (el.y * scale) / lastScale,
    }));
    setPedalboardData(auxelems);
    setLastScale(scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  useEffect(() => {
    localStorage.setItem("pedalboardData", JSON.stringify(pedalboardData));
  }, [pedalboardData]);

  useEffect(() => {
    localStorage.setItem("scale", JSON.stringify(scale));
  }, [scale]);

  useEffect(() => {
    localStorage.setItem("pbAreaSize", JSON.stringify(pbAreaSize));
  }, [pbAreaSize]);

  let availableWidth =
    windowSize !== undefined
      ? hideOptions
        ? windowSize.width
        : windowSize.width * 0.8
      : "";

  const [availableHeight, setAvailableHeight] = useState(0);

  useEffect(() => {
    if (fitToView) {
      setScale((availableWidth - pbScrollBarSize.width) / pbAreaSize.width);
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
  }, [availableWidth, scale]);

  return (
    <div css={Style(hideOptions)} ref={bodyRef}>
      <div className="headSec">Head</div>
      <div className="bodySec">
        <div className="pbZone">
          <Pedalboard
            className={""}
            pedalboardData={pedalboardData}
            setPedalboardData={(data) => setPedalboardData(data)}
            scale={scale}
            setScale={setScale}
            pbAreaSize={pbAreaSize}
            fitToView={fitToView}
            hideOptions={hideOptions}
            availableWidth={availableWidth}
            showTransitions={showTransitions}
            setShowTransitions={setShowTransitions}
            setPbScrollBarSize={setPbScrollBarSize}
            setAvailableHeight={setAvailableHeight}
            windowSize={windowSize}
          />
        </div>
        <PedalboardOptions
          className={"pbOptions"}
          pedalboardData={pedalboardData}
          setPedalboardData={(data) => setPedalboardData(data)}
          scale={scale}
          setScale={setScale}
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
