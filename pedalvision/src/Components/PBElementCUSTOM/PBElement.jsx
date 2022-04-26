import { Style } from "./PBElement.css";

export const PBElement = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
  otherData,
  elementTypeInfo,
  scale,
  showTransitions,
  handleEvent,
}) => {
  return <div className="box" css={Style()}></div>;
};
