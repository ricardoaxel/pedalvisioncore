import { css } from "@emotion/react";
import { layoutSizes } from "../../utils/GeneralImports";

export const Style = (hideOptions) => {
  return css`
    /* font-size: 24px; */
    width: 100%;
    height: 100%;
    background: #11bb44;
    .headSec {
      height: ${layoutSizes.header};
      background-color: #fdfefe;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #f3f9ff;
      .titleLogo {
        font-family: "Righteous";
        font-size: 1.4rem;
      }
    }
    .bodySec {
      background-color: #ffffff;
      width: 100%;
      height: 100%;
      display: flex;
      z-index: 2;

      .pbZone {
        transition: 0.5s;
        width: ${hideOptions ? "100%" : `${layoutSizes.pbZone * 100}%`};
        height: calc(100% - 50px);
        background-color: blue;
        z-index: 1;
      }
      .pbOptions {
        transition: 0.5s;
        width: ${hideOptions ? "0%" : `${layoutSizes.pbOptions * 100}%`};
        height: 100%;
        z-index: 2;
      }
    }
  `;
};
