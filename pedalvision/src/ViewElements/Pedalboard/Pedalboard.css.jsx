import { css, useTheme } from "../../utils/GeneralImports";
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

  const actualTheme = useTheme();

  return css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    /* overflow: auto; */
    overflow: scroll;

    .pedalboardAreaContainer {
      position: absolute;
      width: ${responsiveWidth};
      height: ${responsiveHeight};
      transition: 0.3s;
      ${showOverflow ? "overflow: visible;" : "overflow: hidden;"};
      .gridArea {
        width: 100%;
        height: 100%;
        background: ${actualTheme.grid_background};
        background-image: ${actualTheme.grid_color};
        transition: background-color 0.3s, background-image 0.3s;
        background-size: ${`${scale / unitFactor}px ${scale / unitFactor}px`};
        position: absolute;
      }
    }
  `;
};
