import { useState, useEffect, useRef } from "react";
import { Pedalboard } from "../../Components/PedalboardObjetosYDraggable/Pedalboard";
import { PedalboardOptions } from "../../Components/PedalboardOptions/PedalboardOptions";
import { exampleData } from "./exampleData";
import { Style } from "./PedalboardView.css";
import { useWindowSize } from "../../Hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
    JSON.parse(localStorage.getItem("pbAreaSize"))
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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // console.log({ scale, lastScale });
    if (scale !== lastScale) {
      // When the scale changes the elements positions are recalculated
      let auxelems = [...pedalboardData].map((el) => ({
        ...el,
        x: (el.x * scale) / lastScale,
        y: (el.y * scale) / lastScale,
      }));
      setPedalboardData([...auxelems]);
      setLastScale(scale);
      localStorage.setItem("scale", JSON.stringify(scale));

      let aux2 = { ...boxes };
      Object.keys(boxes).map((key) => {
        aux2[key].left = (aux2[key].left * scale) / lastScale;
        aux2[key].top = (aux2[key].top * scale) / lastScale;
      });
      setBoxes(aux2);
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  useEffect(() => {
    localStorage.setItem("pedalboardData", JSON.stringify(pedalboardData));
  }, [pedalboardData]);

  useEffect(() => {
    localStorage.setItem("pbAreaSize", JSON.stringify(pbAreaSize));
  }, [pbAreaSize]);

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
  }, [availableWidth]);

  ///////BOXES
  const [boxes, setBoxes] = useState(
    JSON.parse(localStorage.getItem("boxes"))
      ? JSON.parse(localStorage.getItem("boxes"))
      : {
          c: {
            id: "pedalsid1",
            top: 0,
            left: 0,
            type: "pedals",
            elementID: "rat",
            Brand: "Pro Co",
            Name: "Rat",
            orientation: "0",
            layer: 1,
          },
          d: {
            id: "pedalassid1",
            top: 0,
            left: 0,
            type: "pedals",
            elementID: "rat",
            Brand: "Pro Co",
            Name: "Rat",
            orientation: "0",
            layer: 1,
          },
        }
  );

  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(boxes));
  }, [boxes]);

  return (
    <div css={Style(hideOptions)} ref={bodyRef}>
      <div className="headSec">Head</div>
      <div className="bodySec">
        <div className="pbZone">
          <DndProvider backend={HTML5Backend}>
            <Pedalboard
              className={""}
              pedalboardData={pedalboardData}
              setPedalboardData={(data) => setPedalboardData(data)}
              scale={scale}
              setScale={setScale}
              pbAreaSize={pbAreaSize}
              availableWidth={availableWidth}
              availableHeight={availableHeight}
              showTransitions={showTransitions}
              setShowTransitions={setShowTransitions}
              setPbScrollBarSize={setPbScrollBarSize}
              windowSize={windowSize}
              setPbAreaSize={setPbAreaSize}
              boxes={boxes}
              setBoxes={setBoxes}
            />
          </DndProvider>
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
          boxes={boxes}
          setBoxes={setBoxes}
        />
      </div>
    </div>
  );
};
