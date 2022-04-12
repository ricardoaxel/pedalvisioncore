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

  const [showTransitions, setShowTransitions] = useState(false);

  //Temporary options
  const [fitToView, setFitToView] = useState(false);
  const [hideOptions, setHideOptions] = useState(false);

  useEffect(() => {
    // el.x * lastScale gives the position in pixels of last scale to know the
    // new one we have to divide it into the new scale
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
            availableWidth={
              windowSize !== undefined
                ? hideOptions
                  ? windowSize.width
                  : windowSize.width * 0.8
                : ""
            }
            showTransitions={showTransitions}
            setShowTransitions={setShowTransitions}
          />
          {/* <ScrollableDragArea /> */}
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
        />
      </div>
    </div>
  );
};
