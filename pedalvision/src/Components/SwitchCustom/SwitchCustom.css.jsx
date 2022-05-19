import { css } from "@emotion/react";
export const Style = (type) => {
  return css`
    display: flex;
    min-width: 3rem;
    background: #f5f7fe;
    border-radius: 4px;
    overflow: hidden;
    font-size: 0.7rem;
    transition: 0.2s;
    div {
      width: 50%;
      padding: 0.25rem;
      text-align: center;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: 0.2s;
      border: 1px solid transparent;
      :hover {
        transition: 0.2s;
        background: #f1f3f9;
        border: 1px solid #d6e2ea;
      }
    }

    .active {
      transition: 0.2s;
      background-color: #4b4b73;
      color: white;
      font-size: 0.8rem;
      :hover {
        transition: 0.2s;
        background-color: #4b4b73;
        font-size: 0.8rem;
        border: 1px solid transparent;
      }
    }
  `;
};
