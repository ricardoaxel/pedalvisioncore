import { useState, useEffect, useRef } from "react";
import { Pedalboard, PedalboardOptions } from "../../ViewElements";
import { exampleData } from "./exampleData";
import { Style } from "./PedalboardView.css";
import { useWindowSize, useLocalStorage } from "../../Hooks";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { preSetScale, fillEmptySpace } from "./functions";
import { layoutSizes, simplebp } from "../../utils/GeneralImports";

import { SwitchTheme } from "../../Components";

export const PedalboardView = () => {
  let windowSize = useWindowSize();
  const bodyRef = useRef();
  const [pedalboardData, setPedalboardData] = useLocalStorage(
    "pedalboardData",
    exampleData
  );
  const [scale, setScale] = useLocalStorage("scale", 18);
  const [pbAreaSize, setPbAreaSize] = useLocalStorage("pbAreaSize", {
    width: 60,
    height: 30,
  });
  const [htmlDrag, setHtmlDrag] = useState(false);
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

  let optionsWidth =
    windowSize.width <= simplebp.phone
      ? layoutSizes.pbOptions.phone
      : windowSize.width <= simplebp.smallpc
      ? layoutSizes.pbOptions.smallpc
      : layoutSizes.pbOptions.bigpc;

  //We send the available dimensions to the child from here to have it before in case we need
  //to calculate percentages and animations
  let availableWidth =
    windowSize !== undefined
      ? hideOptions
        ? windowSize.width
        : windowSize.width - optionsWidth
      : "";

  let availableHeight = windowSize !== undefined ? windowSize.height - 50 : "";

  const preFillEmptySpace = (type) => {
    fillEmptySpace(
      type,
      setPbAreaSize,
      availableWidth,
      scale,
      pbAreaSize,
      pbScrollBarSize,
      availableHeight
    );
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

  const [userHasSelectedHide, setUserHasSelectedHide] = useState(false);
  //To have control autoopen of menu on desktop devices
  const preHideOptions = (value) => {
    if (!userHasSelectedHide) {
      setUserHasSelectedHide(true);
    }
    setHideOptions(value);
  };
  useEffect(() => {
    if (windowSize.width && !userHasSelectedHide) {
      if (windowSize.width <= simplebp.phone) {
        setHideOptions(true);
      } else {
        setHideOptions(false);
      }
    }
  }, [windowSize.width]);

  //Effects
  useEffect(() => {
    let auxScale;
    if (fitToWidth) {
      auxScale = (availableWidth - pbScrollBarSize.width) / pbAreaSize.width;
    }
    if (fitToHeight) {
      auxScale = (availableHeight - pbScrollBarSize.height) / pbAreaSize.height;
    }
    if (auxScale !== undefined) {
      preSetScale(auxScale, pedalboardData, scale, setPedalboardData, setScale);
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
      preFillEmptySpace("both");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale, autofillEmpty]);

  return (
    <div css={Style(hideOptions)} ref={bodyRef}>
      <div className="headSec">
        <p className="titleLogo"> PedalVision</p>
        <div className="optionsSec">
          {/* {actualTheme.displayName === "Light" ? (
            <BsFillSunFill
              onClick={() =>
                sessionInfo.dispatch({
                  type: "field",
                  field: "actualTheme",
                  value: themes.darkTheme,
                })
              }
            />
          ) : (
            <BsMoonFill
              onClick={() =>
                sessionInfo.dispatch({
                  type: "field",
                  field: "actualTheme",
                  value: themes.lightTheme,
                })
              }
            />
          )} */}

          <SwitchTheme />
        </div>
      </div>
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
          setScale={(newScale) =>
            preSetScale(
              newScale,
              pedalboardData,
              scale,
              setPedalboardData,
              setScale
            )
          }
          pbAreaSize={pbAreaSize}
          setPbAreaSize={setPbAreaSize}
          fitToWidth={fitToWidth}
          setFitToWidth={setFitToWidth}
          fitToHeight={fitToHeight}
          setFitToHeight={setFitToHeight}
          hideOptions={hideOptions}
          setHideOptions={preHideOptions}
          setShowTransitions={setShowTransitions}
          autofillEmpty={autofillEmpty}
          setAutofillEmpty={setAutofillEmpty}
          pedalboardData={pedalboardData}
          setPedalboardData={setPedalboardData}
          htmlDrag={htmlDrag}
          setHtmlDrag={setHtmlDrag}
          fillEmptySpace={preFillEmptySpace}
          unitFactor={unitFactor}
          setUnitFactor={setUnitFactor}
          actualElement={actualElement}
          windowSize={windowSize}
        />
      </div>
    </div>
  );
};
