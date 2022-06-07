import { useTheme, css } from "../../utils/GeneralImports";
export const Style = (type) => {
  let actualTheme = useTheme();
  return css`
    background: #b0d5ff;
    width: 2rem;
    border-radius: 1rem;
    padding: 0.1rem;
    padding-left: 0rem;
    padding-right: 0rem;
    height: 1rem;
    overflow: visible;
    display: flex;
    align-items: center;
    cursor: pointer;
    .circleContainer {
      transition: 0.3s;
      background: #ffffff;
      width: 1.3rem;
      height: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2rem;
      /* text-align: center; */
      box-shadow: 0px 0px 4px 1px rgb(202 225 240);
      position: absolute;
      left: ${actualTheme.displayName === "Light"
        ? "0%"
        : "calc(100% - 1.3rem)"};
    }
  `;
};
