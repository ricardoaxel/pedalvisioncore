import { css } from "@emotion/react";
export const Style = (areaWidth, areaHeight, scale, showOverflow) => {
  //This keep track of the windows change
  return css`
    width: 600px;
    height: 600px;
    background-color: darkgrey;
    touch-action: none;
  `;
};
