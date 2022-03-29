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
    .pedalboardAreaContainer {
      position: absolute;
      background-color: green;
      width: 100%;
      height: ${pbAreaResponsiveHeight + "px"};
    }
  `;
};

export const pedalStyle = (
  pbAreaWidth,
  pedalWidth,
  pbAreaHeight,
  pedalHeight,
  pb
) => {
  let percentageWidth = (pedalWidth / pbAreaWidth) * 100 + "%";
  let percentageHeight = (pedalHeight / pbAreaHeight) * 100 + "%";
  // console.log(percentageWidth);
  return css`
    width: ${percentageWidth};
    height: ${percentageHeight};
    position: absolute;
    z-index: ${pb ? 1 : 300000000000};
    background-color: ${pb ? "white" : "red"};
  `;
};
