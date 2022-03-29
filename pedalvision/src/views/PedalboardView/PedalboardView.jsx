import { useState } from "react";
import { Pedalboard } from "../../Components/Pedalboard";
import { style } from "./PedalboardView.css";
export const PedalboardView = () => {
  return (
    <div css={style()}>
      <div className="headSec">Head</div>
      <div className="pbZone">
        <Pedalboard className={"pbContainerExtraClass"} />
      </div>
    </div>
  );
};
