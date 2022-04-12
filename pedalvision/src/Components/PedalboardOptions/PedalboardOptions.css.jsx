import { css } from "@emotion/react";
export const Style = () => {
  return css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #8f7474;
    overflow-x: visible;
    .elementsAddSection {
      width: 100%;
      height: calc(100% - 3rem);
      overflow: scroll;
      background-color: blue;
    }
    .toggleBtn {
      width: 1rem;
      height: 2rem;
      position: absolute;
      top: calc(50% - 3rem);
      display: flex;
      justify-content: center;
      align-items: center;
      left: -1rem;
      background-color: #dee3e8;
      transition: 0.2s;
      :hover {
        cursor: pointer;
        background-color: #d9dbde;
      }
    }
  `;
};
