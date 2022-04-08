import { Global } from "@emotion/react";
import React from "react";
import { Style } from "./Layout.css";
import { MainStyle } from "./MainLayout.css";
const Layout = ({ children, type }) => {
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
