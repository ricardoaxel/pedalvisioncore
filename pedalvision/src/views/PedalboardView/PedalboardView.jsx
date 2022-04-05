import { useState } from "react";
import { Pedalboard } from "../../Components/Pedalboard";
import { PedalboardOptions } from "../../Components/PedalboardOptions/PedalboardOptions";

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
        <div className="pbOptions">
          <PedalboardOptions />
        </div>
      </div>
    </div>
  );
};
