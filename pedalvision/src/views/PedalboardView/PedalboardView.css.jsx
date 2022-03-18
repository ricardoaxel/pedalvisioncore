import { css } from "@emotion/react";
export const style = (color) => {
  return css`
    padding: 32px;
    background-color: green;
    font-size: 24px;
    border-radius: 4px;
    &:hover {
      color: ${color};
    }
  `;
};
