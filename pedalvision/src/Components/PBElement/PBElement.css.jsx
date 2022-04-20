import { css } from "@emotion/react";

export const Style = (
  pedalWidth,
  pedalHeight,
  scale,
  showTransitions,
  data
) => {
  let responsiveWidth = pedalWidth * scale + "px";
  let responsiveHeight = pedalHeight * scale + "px";
  let squareMargin = "3";
  let horizontalOrientation =
    Math.abs(data.orientation) === 0 || Math.abs(data.orientation) === 180;

  let leftMarginForImage = 0;
  let topMarginForImage = 0;

  switch (data.orientation) {
    case -270:
    case 90:
      leftMarginForImage = responsiveHeight;
      break;
    case 270:
    case -90:
      topMarginForImage = responsiveWidth;
      break;
    case 180:
    case -180:
      leftMarginForImage = responsiveWidth;
      topMarginForImage = responsiveHeight;
      break;

    default:
      break;
  }

  return css`
    width: ${horizontalOrientation ? responsiveWidth : responsiveHeight};
    height: ${horizontalOrientation ? responsiveHeight : responsiveWidth};
    position: absolute;
    transform: ${"rotate(" + data.orientation + "deg);"};
    transition: ${showTransitions
      ? "all .2s  ease, transform .4s ease-out;"
      : "0s;"};

    :hover,
    :focus,
    :active {
      transition: ${showTransitions
        ? "all .2s  ease, transform .4s ease-out;"
        : "0s;"};
      .borderSquare {
        transition: 0.15s;
        border: 1px solid blue;
      }
    }

    .borderSquare {
      width: ${horizontalOrientation ? responsiveWidth : responsiveHeight};
      height: ${horizontalOrientation ? responsiveHeight : responsiveWidth};
      position: absolute;
      padding: ${squareMargin + "px"};
      border-radius: 4px;
      margin-left: -${squareMargin * 1.25 + "px"};
      margin-top: -${squareMargin + "px"};
      border: 0px solid transparent;
      /* transform: ${"rotate(" + data.orientation + "deg);"}; */
      transition: ${showTransitions
        ? "all .2s  ease, transform .4s ease-out;"
        : "0s;"};
    }
    .elementImage {
      width: ${responsiveWidth};
      height: ${responsiveHeight};
      left: ${leftMarginForImage};
      top: ${topMarginForImage};
      position: absolute;
      transform: ${"rotate(" + data.orientation + "deg);"};
      transform-origin: top left;
      transition: ${showTransitions
        ? "all .2s  ease, transform .4s ease-out;"
        : "0s;"};
      -webkit-backface-visibility: hidden; //Removes the browser antialising (blur) on Chrome
    }

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
    .show {
      transition: all 0.2s ease, transform 0.4s ease-out;
      opacity: 1;
    }
  `;
};
