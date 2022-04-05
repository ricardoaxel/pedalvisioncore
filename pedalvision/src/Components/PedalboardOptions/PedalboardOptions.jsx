import { Style, pedalStyle } from "./PedalboardOptions.css";
import React, { useRef, useEffect, useState } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";

export const PedalboardOptions = ({ className }) => {
  return (
    <div css={Style()} className={className}>
      <div className="elementsAddSection">
        <div className="elementSel">
          Pedalboards:
          <select>
            {pedalboards.map((pedalboard) => (
              <option>{pedalboard.Name}</option>
            ))}
          </select>
        </div>
        <div className="elementSel">
          Pedals:
          <select>
            {pedals.map((pedal) => (
              <option>{pedal.Name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
