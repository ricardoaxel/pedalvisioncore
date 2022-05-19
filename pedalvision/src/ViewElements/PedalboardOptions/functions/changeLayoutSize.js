import { getLatestPositions } from "../../../utils/functions";

export const changeLayoutSize = (
  value,
  type,
  pedalboardData,
  scale,
  setPbAreaSize,
  pbAreaSize
) => {
  let maxOfType = getLatestPositions(pedalboardData, scale, type);
  if (value > maxOfType / scale) {
    setPbAreaSize({ ...pbAreaSize, [type]: value });
  }
};
