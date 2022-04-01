import { css } from "@emotion/react";
export const style = (color) => {
  return css`
    font-size: 24px;
    width: 100%;
    height: 100%;
    background: #d5ddeb;
    .headSec {
      height: 3rem;
      background-color: #eef2fb;
    }
    .bodySec {
      background-color: #d6e8ff;
      width: 100%;
      height: 100%;
      display: flex;

      .pbZone {
        width: 80%;
        height: calc(100% - 3rem);
        background-color: blue;
      }
      .pbOptions {
        width: 20%;
        height: 100%;
        background-color: #e4e2e2;
      }
    }
  `;
};
