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
      height: 100%;
      display: flex;
      justify-content: center;
      display: scroll;
      .pbContainerExtraClass {
        width: 80%;
      }
    }
  `;
};
