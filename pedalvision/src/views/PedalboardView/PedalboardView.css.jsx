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
    }
    .bodySec {
      background-color: #d6e8ff;
      width: 100%;
      height: 100%;
      display: flex;

      .pbZone {
        transition: 0.5s;
        width: ${hideOptions ? "100%" : "80%"};
        height: calc(100% - 50px);
        background-color: blue;
      }
      .pbOptions {
        transition: 0.5s;
        width: ${hideOptions ? "0%" : "20%"};
        height: 100%;
        background-color: #e4e2e2;
      }
    }
  `;
};
