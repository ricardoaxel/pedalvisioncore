import { useState, useEffect } from "react";
import { Pedalboard } from "../../Components/Pedalboard";
import { PedalboardOptions } from "../../Components/PedalboardOptions/PedalboardOptions";
import { exampleData } from "./exampleData";
import { style } from "./PedalboardView.css";

export const PedalboardView = () => {
  const [pedalboardData, setPedalboardData] = useState(
    JSON.parse(localStorage.getItem("pedalboardData"))
      ? JSON.parse(localStorage.getItem("pedalboardData"))
      : exampleData
  );
  const [lastScale, setLastScale] = useState(18);
  const [scale, setScale] = useState(18);
  const [pbAreaSize, setPbAreaSize] = useState({ width: 60, height: 30 });

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
  }, [scale]);

  return (
    <div css={style()}>
      <div className="headSec">Head</div>
      <div className="bodySec">
        <div className="pbZone">
          <Pedalboard
            className={"pbContainerExtraClass"}
            pedalboardData={pedalboardData}
            setPedalboardData={(data) => setPedalboardData(data)}
            scale={scale}
            pbAreaSize={pbAreaSize}
          />
          {/* <ScrollableDragArea /> */}
        </div>
        <div className="pbOptions">
          <PedalboardOptions
            pedalboardData={pedalboardData}
            setPedalboardData={(data) => setPedalboardData(data)}
            scale={scale}
            setScale={setScale}
            pbAreaSize={pbAreaSize}
            setPbAreaSize={setPbAreaSize}
          />
        </div>
      </div>
    </div>
  );
};
