import { css } from "@emotion/react";

export const Style = (hideOptions) => {
  return css`
    font-size: 24px;
    width: 100%;
    height: 100%;
    background: #11bb44;
    .headSec {
      height: 50px;
      background-color: #eef2fb;
      z-index: 3;
    }
    .bodySec {
      background-color: #d6e8ff;
      width: 100%;
      height: 100%;
      display: flex;
      z-index: 2;

      .pbZone {
        transition: 0.5s;
        width: ${hideOptions ? "100%" : "80%"};
        height: calc(100% - 50px);
        background-color: blue;
        z-index: 1;
      }
      .pbOptions {
        transition: 0.5s;
        width: ${hideOptions ? "0%" : "20%"};
        height: 100%;
        background-color: #e4e2e2;
        z-index: 2;
      }
    }
  `;
};
