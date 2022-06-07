import { css } from "@emotion/react";
// import { useIntl } from "react-intl";
import { CSSTransition } from "react-transition-group";
import { Images } from "../assets/images";
import { useTheme } from "../Hooks";
// import axios from "axios";
//Standard media queries for different devices (br:breakpoints)

const layoutSizes = {
  header: "50px",
  pbZone: ".82",
  pbOptions: { smallpc: 240, bigpc: 320, phone: 0 },
};
const simplebp = {
  phone: 500,
  tablet: 800,
  smallpc: 1200,
  pc: 1600,
  bigpc: 2000,
};
const bp = { phone: 500, tablet: 800, smallpc: 1200, pc: 1600, bigpc: 2000 };
Object.entries(bp).forEach(([key, value]) => {
  bp[key] = `@media (max-width: ${value}px)`;
});

export { css, simplebp, bp, layoutSizes, CSSTransition, Images, useTheme };
