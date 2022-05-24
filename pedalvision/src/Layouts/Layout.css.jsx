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

    /* latin-ext */
    @font-face {
      font-family: "Righteous";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("https://fonts.gstatic.com/s/righteous/v13/1cXxaUPXBpj2rGoU7C9WhnGFucE.woff2")
        format("woff2");
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
        U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: "Righteous";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("https://fonts.gstatic.com/s/righteous/v13/1cXxaUPXBpj2rGoU7C9WiHGF.woff2")
        format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
        U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
        U+2212, U+2215, U+FEFF, U+FFFD;
    }
    * {
      //background-color: #c9ced8;
      margin: 0;
      font-family: "Montserrat";
      //SCROLLBAR
      //Firefox
      scrollbar-color: #c9ced8 #ecf1f6;
      scrollbar-width: thin;
      //Chrome & Others
      ::-webkit-scrollbar {
        height: 9px;
        width: 8px;
        background: #ecf1f6;
        cursor: pointer;
      }

      ::-webkit-scrollbar-thumb {
        background: #c9ced8;
        cursor: pointer;
        -webkit-border-radius: 1ex;
        -webkit-box-shadow: 0px 1px 2px #c9ced8;
      }

      ::-webkit-scrollbar-corner {
        background: #000;
      }
    }
    body {
      /* @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital@1&display=swap"); */
      overflow-y: hidden;
      margin: 0;
      transition: color 0.2s;
      font-family: "Rubik";

      //Transitions
      .increaseAnimation-enter {
        opacity: 0;
        width: 75%;
        /* height: 0%; */
      }
      .increaseAnimation-enter-active {
        opacity: 1;
        width: 100%;
        /* height: 100%; */
        transition: opacity 300ms, width 300ms, height 300ms;
      }
      .increaseAnimation-exit {
        opacity: 1;
        width: 100%;
        /* height: 100%; */
      }
      .increaseAnimation-exit-active {
        opacity: 0;
        width: 75%;
        /* height: 0%; */
        transition: opacity 300ms, width 300ms, height 300ms;
      }
    }
  `;
};
