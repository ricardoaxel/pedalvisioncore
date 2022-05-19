import { css } from "@emotion/react";
export const Style = (type) => {
  switch (type) {
    case "submit":
      return css`
        width: 100%;
        border-radius: 3px;
        padding: 0.25rem;
        color: white;
        transition: 0.2s;
        cursor: pointer;
        font-size: 0.7rem;
        font-weight: 300;
        border: 1px solid white;
        color: #ffffff;
        background: #1998ff;
        :hover {
          transition: 0.2s;
          background: #0071fc;
        }
      `;

    default:
      return css`
        width: 100%;
        border-radius: 3px;
        padding: 0.25rem;
        color: white;
        transition: 0.2s;
        cursor: pointer;
        background: #f5f7fe;
        font-size: 0.7rem;
        font-weight: 300;
        border: 1px solid white;
        color: #575f74;
        :hover {
          transition: 0.2s;
          background: #e3e9ff;
          color: black;
        }
      `;
  }
};
