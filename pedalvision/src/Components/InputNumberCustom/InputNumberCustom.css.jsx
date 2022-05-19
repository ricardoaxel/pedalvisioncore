import { css } from "@emotion/react";
export const Style = () => {
  return css`
    border: 0px;
    border-bottom: 1px solid #ccd0dd;
    padding-bottom: 0.25rem;
    padding-top: 0.25rem;
    font-size: 0.75rem;
    transition: 0.2s;
    :hover {
      transition: 0.2s;
      font-size: 0.85rem;
      background-color: #f9f9ff;
    }
    :focus {
      transition: 0.2s;
      border: 0px;
      outline: none;
      font-size: 0.85rem;
      background-color: #f9f9ff;
    }
  `;
};
