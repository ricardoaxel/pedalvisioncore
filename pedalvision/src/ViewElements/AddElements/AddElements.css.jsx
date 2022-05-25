import { css } from "@emotion/react";
export const Style = () => {
  return css`
    width: 100%;
    font-size: 0.7rem;
    h2 {
      margin-bottom: 0.5rem;
      margin-top: 1rem;
    }
    .row {
      display: flex;
    }
    .elementType {
      border-radius: 4px;
      overflow: hidden;
      border-bottom: 1px solid #f6f2f2;
      p {
        width: 50%;
        height: 1.25rem;
        padding: 0.5rem;
        margin-left: 0rem;
        display: flex;
        justify-content: left;
        align-items: center;
        cursor: pointer;
        transition: 0.2s;
        :first-of-type {
          border-right: 1px solid #a9bdc7;
        }
      }
      .active {
        transition: 0.2s;
        background-color: #f2f8ff;
        font-size: 0.8rem;
      }
    }

    .margins {
      margin-top: 0.5rem;
    }
    .pedalIcon {
      width: 1rem;
      margin-right: 0.25rem;
    }
  `;
};

// #f2f8ff
