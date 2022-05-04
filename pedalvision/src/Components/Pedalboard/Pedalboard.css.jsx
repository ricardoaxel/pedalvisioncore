import { css } from "@emotion/react";
export const Style = (
  areaWidth,
  areaHeight,
  scale,
  showOverflow = true,
  unitFactor
) => {
  //This keep track of the windows change
  let responsiveWidth = areaWidth * scale + "px";
  let responsiveHeight = areaHeight * scale + "px";

  return css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    /* overflow: auto; */
    overflow: scroll;
    background-color: #c55e5e;

    .pedalboardAreaContainer {
      position: absolute;
      background-color: #ffffff;
      width: ${responsiveWidth};
      height: ${responsiveHeight};
      transition: 0.3s;
      ${showOverflow ? "overflow: visible;" : "overflow: hidden;"};
      .gridArea {
        width: 100%;
        height: 100%;
        background-image: repeating-linear-gradient(
            #edeff2 0 1px,
            transparent 1px 100%
          ),
          repeating-linear-gradient(90deg, #edeff2 0 1px, transparent 1px 100%);
        background-size: ${`${scale / unitFactor}px ${scale / unitFactor}px`};
        position: absolute;
      }
    }
  `;
};
