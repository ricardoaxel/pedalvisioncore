import { Global } from "@emotion/react";
import React from "react";
import { Style } from "./Layout.css";
import { MainStyle } from "./MainLayout.css";
import { useSession, useTheme } from "../Hooks";
const Layout = ({ children, type }) => {
  const info = useSession();
  const actualTheme = useTheme();
  //Depending on the type of page, the layout may change
  let styleSelector;
  switch (type) {
    default:
      styleSelector = MainStyle;
      break;
  }
  return (
    <>
      <main css={styleSelector}>{children}</main>
      <Global styles={Style} />
    </>
  );
};

export { Layout };
