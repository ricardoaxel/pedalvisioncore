import { css } from "@emotion/react";

export const Style = (pedalWidth, pedalHeight, scale, pb, showTransitions) => {
  let responsiveWidth = pedalWidth * scale + "px";
  let responsiveHeight = pedalHeight * scale + "px";
  let squareMargin = "3";
  return css`
    width: ${responsiveWidth};
    height: ${responsiveHeight};
    position: absolute;
    transition: ${showTransitions ? ".2s;" : "0s;"};
    :hover,
    :focus,
    :active {
      transition: ${showTransitions ? ".2s;" : "0s;"};
      .borderSquare {
        transition: 0.15s;
        border: 1px solid blue;
      }
    }

    .borderSquare {
      width: ${responsiveWidth};
      height: ${responsiveHeight};
      position: absolute;
      padding: ${squareMargin + "px"};
      border-radius: 4px;
      margin-left: -${squareMargin * 1.25 + "px"};
      margin-top: -${squareMargin + "px"};
      transition: 0.3s;
      border: 0px solid transparent;
      transition: ${showTransitions ? ".2s;" : "0s;"};
    }
    .elementImage {
      width: ${responsiveWidth};
      height: ${responsiveHeight};
      position: absolute;
      transition: ${showTransitions ? ".2s;" : "0s;"};
    }

    .options {
      width: 2rem;
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
      transition: 0.2s;
      opacity: 0;
      p {
        :hover {
          transition: 0.2s;
          background-color: grey;
          cursor: pointer;
        }
      }
    }
    .show {
      transition: 0.2s;
      opacity: 1;
    }
  `;
};
