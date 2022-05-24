import { css } from "@emotion/react";
import { bp } from "../../utils/GeneralImports";
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
      width: 0.9rem;
      height: 2.5rem;
      position: absolute;
      top: calc(50% - 3rem);
      display: flex;
      justify-content: center;
      align-items: center;
      left: -0.9rem;
      background-color: #6a7987;
      color: white;
      transition: 0.2s;
      border-radius: 8px 0px 0px 8px;
      ${bp.phone} {
        top: -1.5rem;
        left: calc(50% - 0.45rem);
        transform: rotate(90deg);
      }
      :hover {
        cursor: pointer;
        background-color: #d9dbde;
      }
      :active,
      :focus {
        background: #1367ee;
      }
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
