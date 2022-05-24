import { css } from "@emotion/react";
export const Style = () => {
  return css`
    width: 100%;
    font-size: 0.9rem;
    .greyBtn {
      background: #8aa8d3;
    }
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        margin-right: 0.2rem;
      }
    }
    .topSec {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .leftArea {
        transition: 0.2s;
        width: 70%;
        h2 {
          margin-bottom: 0.5rem;
        }
      }
      .rightArea {
        /* background-color: red; */
        display: flex;
        svg {
          font-size: 1rem;
          margin-right: 0.1rem;
          transition: 0.2s;
          :hover {
            transition: 0.2s;
            cursor: pointer;
            font-size: 1.2rem;
          }
        }
        .upload {
          margin-right: 0.2rem;
        }
      }
    }
    .fillsSec {
      .row {
        margin-bottom: 0.5rem;
      }
    }
    .section {
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .helpSec {
      font-size: 0.8rem;
      color: #abb2c2;
      text-align: center;
      margin-top: 1.25rem;
      .rowLabel {
        margin-top: 0.5rem;
        justify-content: center;
        color: #4b6274;
      }
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      .rowDes {
        width: 70%;
      }
    }
    .rowInput {
      input {
        margin-left: 0.2rem;
        width: 30%;
      }
    }
    .rowLabel {
      display: flex;
      justify-content: left;
      margin-bottom: 0.25rem;
      align-items: center;
      p {
        text-align: right;
      }
      :nth-of-type(1) {
        margin-right: 1rem;
      }
    }

    .optionsBtn {
    }
  `;
};
