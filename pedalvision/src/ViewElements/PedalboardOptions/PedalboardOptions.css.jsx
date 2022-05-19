import { css } from "@emotion/react";
export const Style = () => {
  return css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: visible;
    border-top: 0.5px solid #f3f9ff;
    .optionsSection {
      width: 100%;
      height: calc(100%);
      overflow: auto;
      /* background-color: blue; */
      font-size: 1rem;
      padding: 1rem;
      h2 {
        font-size: 1.1rem;
        font-weight: 500;
      }
      > div {
        padding-bottom: 1rem;
        border-bottom: 2px solid #f2f8ff;
      }
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
