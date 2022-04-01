import { css } from "@emotion/react";
// import { useSession } from "../Hooks";
// import { useTheme } from "../utils/GeneralImports";
// export const Style = () => {
//   const sessionInfo = useSession();
//   // const actualTheme = useTheme();
//   return css`
//     //Cards font
//     @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap");
//     @import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;1,600&display=swap");
//     * {
//       //background-color: #b6341d;
//       margin: 0;
//       //SCROLLBAR
//       //Firefox
//       //SCROLLBAR
//       scrollbar-color: ${actualTheme.scrollbar} ${actualTheme.scrollbarBG};
//       scrollbar-width: thin;
//       //Chrome & Others
//       ::-webkit-scrollbar {
//         height: 7px;
//         background: ${actualTheme.scrollbarBG};
//         cursor: pointer;
//       }
//       ::-webkit-scrollbar-thumb {
//         background: ${actualTheme.scrollbar};
//         cursor: pointer;
//         -webkit-border-radius: 1ex;
//         -webkit-box-shadow: 0px 1px 2px ${actualTheme.scrollbarBG};
//       }

//       ::-webkit-scrollbar-corner {
//         background: #000;
//       }
//     }
//     body {
//       @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital@1&display=swap");
//       overflow-y: hidden;
//       margin: 0;
//       color: ${sessionInfo.sessionState.actualTheme.color};
//       transition: color 0.2s;
//       font-family: "Rubik";
//       /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
//         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
//         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
//       --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
//         "Liberation Mono", "Courier New", monospace; */
//     }
//     .aplication {
//       width: 100%;
//       height: 100vh;
//       background-color: #f2f2f2;
//       overflow-y: auto;
//     }
//   `;
// };

export const Style = () => {
  // const actualTheme = useTheme();
  return css`
    //Cards font
    @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;1,600&display=swap");
    * {
      //background-color: #b6341d;
      margin: 0;
      //SCROLLBAR
      //Firefox
      //SCROLLBAR
      scrollbar-width: thin;
      //Chrome & Others
      /* ::-webkit-scrollbar {
        height: 7px;
        cursor: pointer;
      }
      ::-webkit-scrollbar-thumb {
        cursor: pointer;
        -webkit-border-radius: 1ex;
      }

      ::-webkit-scrollbar-corner {
        background: #000;
      } */
    }
    body {
      @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital@1&display=swap");
      overflow-y: hidden;
      margin: 0;
      transition: color 0.2s;
      font-family: "Rubik";
      /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
        "Liberation Mono", "Courier New", monospace; */
    }
  `;
};
