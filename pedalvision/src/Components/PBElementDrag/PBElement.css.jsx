import { css } from "@emotion/react";
export const Style = (
  pedalWidth,
  pedalHeight,
  scale,
  showTransitions,
  data,
  hideOptions
) => {
  let responsiveWidth = pedalWidth * scale + "px";
  let responsiveHeight = pedalHeight * scale + "px";
  let squareMargin = "3";
  let horizontalOrientation =
    Math.abs(data.orientation) === 0 || Math.abs(data.orientation) === 180;

  let leftMarginForImage = 0;
  let topMarginForImage = 0;

  let rotationType = "bottp";

  if (rotationType === "top") {
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
  } else {
    switch (data.orientation) {
      case -270:
      case 90:
        topMarginForImage = -parseInt(responsiveHeight) + "px";
        break;
      case 270:
      case -90:
        topMarginForImage =
          parseInt(responsiveWidth) - parseInt(responsiveHeight) + "px";
        leftMarginForImage = parseInt(responsiveHeight) + "px";
        break;
      case 180:
      case -180:
        leftMarginForImage = responsiveWidth;
        topMarginForImage = -parseInt(responsiveHeight) + "px";
        break;

      default:
        break;
    }
  }

  return css`
    width: ${horizontalOrientation ? responsiveWidth : responsiveHeight};
    height: ${horizontalOrientation ? responsiveHeight : responsiveWidth};
    position: absolute;
    transition: ${showTransitions
      ? "all .2s  ease, transform .4s ease-out;"
      : "0s;"};
    z-index: ${data.layer};

    background-color: transparent;
    cursor: move;

    :hover,
    :focus,
    :active {
      .borderSquare {
        border: 1px solid blue;
      }
      .options {
        opacity: 1;
      }
      .layer {
        opacity: 1;
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
      transition: ${"all .2s, transform .4s ease-out;"};
      display: ${hideOptions ? "none;" : "block;"};
    }
    .elementImage {
      width: ${responsiveWidth};
      height: ${responsiveHeight};
      left: ${leftMarginForImage};
      top: ${topMarginForImage};
      position: absolute;
      transform: ${"rotate(" + data.orientation + "deg);"};
      transform-origin: ${rotationType === "top" ? "top left" : "bottom left"};
      transition: ${"all .2s, transform .4s"};
      -webkit-backface-visibility: hidden; //Removes the browser antialising (blur) on Chrome
    }

    .options {
      width: 3rem;
      height: 1rem;
      position: absolute;
      border-radius: 8px;
      bottom: -14px;
      right: -12px;
      border: 0px solid transparent;
      color: #000000;
      z-index: 100000000000000;
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
      display: ${hideOptions ? "none;" : "flex;"};
      p {
        :hover {
          transition: all 0.2s ease, transform 0.4s ease-out;
          background-color: grey;
          cursor: pointer;
        }
      }
    }

    .layer {
      font-size: 0.6rem;
      position: absolute;
      border-radius: 8px;
      top: -25px;
      left: -23px;
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
      flex-direction: column;
      display: ${hideOptions ? "none;" : "block;"};
      p {
        font-size: 0.8rem;
        :hover {
          transition: all 0.2s ease, transform 0.4s ease-out;
          background-color: grey;
          cursor: pointer;
        }
      }
    }
  `;
};
