import { Style } from "./SwitchCustom.css";
export const SwitchCustom = ({
  activeSide,
  leftValue,
  leftAction,
  rightValue,
  rightAction,
}) => {
  console.log(activeSide);
  return (
    <div css={Style()}>
      <div
        className={`${activeSide === "left" ? "active" : ""}`}
        onClick={leftAction}
      >
        {leftValue}
      </div>
      <div
        className={`${activeSide === "right" ? "active" : ""}`}
        onClick={rightAction}
      >
        {rightValue}
      </div>
    </div>
  );
};
