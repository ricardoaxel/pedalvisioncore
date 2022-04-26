// //BUENO
import { css } from "@emotion/react";

export const Style = () => {
  return css`
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: black;
    will-change: transform, left, top;
    contain: layout;
    touch-action: none;
  `;
};
