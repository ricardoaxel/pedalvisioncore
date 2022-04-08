import { css } from "@emotion/react";

export const Style = () => {
  return css`
    //Cards font
    @font-face {
      font-family: "Rubik";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("https://fonts.gstatic.com/s/rubik/v19/iJWKBXyIfDnIV7nMrXyi0A.woff2")
        format("woff2");
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
        U+FE2E-FE2F;
    }
    * {
      margin: 0;
      //SCROLLBAR
      //Firefox
      //SCROLLBAR
      scrollbar-width: thin;
      font-family: "Montserrat";
    }
    body {
      /* @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital@1&display=swap"); */
      overflow-y: hidden;
      margin: 0;
      transition: color 0.2s;
      font-family: "Rubik";
    }
  `;
};
