import { css } from "@emotion/react";
import { layoutSizes, bp, useTheme } from "../../utils/GeneralImports";

export const Style = (hideOptions) => {
  const actualTheme = useTheme();
  return css`
    width: 100%;
    height: 100%;
    .headSec {
      height: ${layoutSizes.header};
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #f3f9ff;
      .titleLogo {
        font-family: "Righteous";
        font-size: 1.4rem;
      }
      .optionsSec {
        position: absolute;
        right: 1.5rem;
        svg {
          font-size: 0.7rem;
        }
      }
    }
    .bodySec {
      width: 100%;
      height: 100%;
      display: flex;
      z-index: 2;

      .pbZone {
        transition: 0.5s;
        height: calc(100% - 50px);
        z-index: 1;
        width: ${hideOptions
          ? "100%"
          : `calc(100% - ${layoutSizes.pbOptions.bigpc}px)`};
        ${bp.smallpc} {
          width: ${hideOptions
            ? "100%"
            : `calc(100% - ${layoutSizes.pbOptions.smallpc}px)`};
        }
        ${bp.phone} {
          width: 100%;
        }
      }
      .pbOptions {
        transition: 0.5s;
        height: 100%;
        z-index: 2;
        min-width: ${hideOptions ? "0%" : layoutSizes.pbOptions.bigpc + "px"};
        width: ${hideOptions ? "0%" : layoutSizes.pbOptions.bigpc + "px"};
        ${bp.smallpc} {
          min-width: ${hideOptions
            ? "0%"
            : layoutSizes.pbOptions.smallpc + "px"};
          width: ${hideOptions ? "0%" : layoutSizes.pbOptions.smallpc + "px"};
        }
        ${bp.phone} {
          width: 100%;
          position: fixed;
          bottom: 0;
          height: ${hideOptions ? "0%" : `50%`};
          ${!hideOptions
            ? `
            box-shadow: 0px -1px 15px 1px rgb(174, 187, 198);
            -webkit-box-shadow:  0px -1px 15px 1px rgb(174, 187, 198);
            -moz-box-shadow:  0px -1px 15px 1px rgb(174, 187, 198);
            border-radius: 1.5rem 1.5rem 0 0;
            `
            : ""}
        }
      }
    }
  `;
};
