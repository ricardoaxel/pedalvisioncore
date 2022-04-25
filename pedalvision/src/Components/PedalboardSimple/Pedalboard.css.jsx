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

    .options {
      width: 3rem;
      height: 1rem;
      position: absolute;
      border-radius: 8px;
      bottom: -8px;
      right: -8px;
      border: 0px solid transparent;
      color: #000000;
      z-index: 100000000000000;
      display: flex;
      background: #f3f7fb;
      font-size: 1rem;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      padding: 4px;
      transition: all 0.2s ease, transform 0.4s ease-out;
      opacity: 0;
      p {
        :hover {
          transition: all 0.2s ease, transform 0.4s ease-out;
          background-color: grey;
          cursor: pointer;
        }
      }
    }
  `;
};
