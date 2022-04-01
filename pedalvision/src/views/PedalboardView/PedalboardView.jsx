import { useState } from "react";
import { Pedalboard } from "../../Components/Pedalboard";
import { ScrollableDragArea } from "../../Components/ScrollableDragArea";
import { style } from "./PedalboardView.css";
export const PedalboardView = () => {
  return (
    <div css={style()}>
      <div className="headSec">Head</div>
      <div className="bodySec">
        <div className="pbZone">
          <Pedalboard className={"pbContainerExtraClass"} />
          {/* <ScrollableDragArea /> */}
        </div>
        <div className="pbOptions"></div>
      </div>
    </div>
  );
};
