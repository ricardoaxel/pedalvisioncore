import { getLatestPositions } from "../../../utils/functions";
export const adjustLayoutToElements = (
  type = "both",
  setPbAreaSize,
  pedalboardData,
  scale,
  unitFactor,
  pbAreaSize
) => {
  //The use of unitFactor is to adjust to the actual type of units
  setPbAreaSize({
    width:
      type === "width" || type === "both"
        ? Math.floor(
            (getLatestPositions(pedalboardData, scale, "width") / scale + 1) *
              unitFactor
          ) / unitFactor
        : pbAreaSize.width,
    height:
      type === "height" || type === "both"
        ? Math.floor(
            (getLatestPositions(pedalboardData, scale, "height") / scale + 1) *
              unitFactor
          ) / unitFactor
        : pbAreaSize.height,
  });
};
