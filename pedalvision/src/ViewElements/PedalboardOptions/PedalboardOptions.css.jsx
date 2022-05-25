import { css } from "@emotion/react";
import { bp } from "../../utils/GeneralImports";
export const Style = (hideOptions) => {
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
      width: 0.9rem;
      height: 2.5rem;
      position: absolute;
      top: calc(50% - 3rem);
      display: flex;
      justify-content: center;
      align-items: center;
      left: -0.9rem;
      color: white;
      transition: 0.2s;
      border-radius: 8px 0px 0px 8px;
      font-size: 2rem;
      background-color: #485460;
      cursor: pointer;
      ${bp.phone} {
        top: -0.9rem;
        left: calc(50% - 1.12rem);
        transform: rotate(90deg);
        border-radius: 4rem;
        width: 2.5rem;
        height: 2.5rem;
        ${hideOptions
          ? `
          top: -5rem;
          left: calc(50% - 1.2rem);
          background-color: #1085ff;
          width: 3.5rem;
          height: 3.5rem;
          transform: rotate(360deg);
          box-shadow: 0px 0px 15px 2px rgb(133 173 255);
          `
          : ""}
        img {
          width: 60%;
          filter: brightness(0) invert(1);
        }
      }
      /* :hover {
        cursor: pointer;
        background-color: #d9dbde;
      } */
      /* :active,
      :focus {
        background: #1367ee;
      } */
      svg {
        transition: 0.3s;
      }
      .turn {
        transition: 0.3s;
        transform: rotate(180deg);
      }
    }
  `;
};
