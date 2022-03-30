import { css } from "@emotion/react";
export const style = (color) => {
  return css`
    font-size: 24px;
    width: 100%;
    height: 100%;
    background: #d5ddeb;
    .headSec {
      height: 10rem;
    }
    .pbZone {
      width: 100%;
      height: calc(100% - 12rem);
      display: flex;
      /* background-color: #5f5757; */
      justify-content: center;
      display: scroll;
      .pbContainerExtraClass {
        width: 100%;
      }
    }
  `;
};
