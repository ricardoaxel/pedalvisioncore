import React from "react";
import { Global } from "@emotion/react";
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
      {/* General styles for all the App */}
      <Global styles={Style} />
      <main css={styleSelector}>{children}</main>
    </>
  );
};

export { Layout };
