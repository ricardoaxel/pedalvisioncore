import { css } from "../../utils/GeneralImports";
import { useWindowSize } from "../../Hooks";
import { useState, useEffect } from "react";
export const Style = (pbAreaResponsiveHeight) => {
  //This keep track of the windows change
  let windowSize = useWindowSize();

  return css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: scroll;
  `;
};

export const pedalStyle = (pedalWidth, pedalHeight, scale, pb) => {
  let percentageWidth = pedalWidth * scale + "px";
  let percentageHeight = pedalHeight * scale + "px";
  // console.log(percentageWidth);
  return css`
    width: ${percentageWidth};
    height: ${percentageHeight};
    position: absolute;
    z-index: ${pb ? 1 : 300000000000};
    background-color: ${pb ? "white" : "red"};
  `;
};
