import { css } from "@emotion/react";
export const Style = (areaWidth, areaHeight, scale) => {
  //This keep track of the windows change
  let responsiveWidth = areaWidth * scale + "px";
  let responsiveHeight = areaHeight * scale + "px";

  return css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #c55e5e;
    .pedalboardAreaContainer {
      position: absolute;
      background-color: #ffffff;
      width: ${responsiveWidth};
      height: ${responsiveHeight};
      transition: 0.3s;
    }
  `;
};

export const pedalStyle = (
  pedalWidth,
  pedalHeight,
  scale,
  pb,
  showTransitions
) => {
  let responsiveWidth = pedalWidth * scale + "px";
  let responsiveHeight = pedalHeight * scale + "px";
  return css`
    width: ${responsiveWidth};
    height: ${responsiveHeight};
    position: absolute;
    z-index: ${pb ? 1 : 300000000000};
    background-color: ${pb ? "white" : "red"};
    transition: ${showTransitions ? ".3s;" : "0s;"};
  `;
};
