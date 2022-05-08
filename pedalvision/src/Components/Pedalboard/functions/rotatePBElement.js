import { getLatestPositions } from "../../../utils/functions";
export const rotatePBElement = (
  id,
  deg,
  pedalboardData,
  scale,
  pbAreaSize,
  setPbAreaSize,
  setPedalboardData
) => {
  let auxPB = { ...pedalboardData };
  auxPB[id]["orientation"] =
    parseInt(auxPB[id]["orientation"]) + deg >= 360 ||
    parseInt(auxPB[id]["orientation"]) + deg <= -360
      ? 0
      : parseInt(auxPB[id]["orientation"]) + deg;

  let auxSize = {
    width: getLatestPositions(auxPB, scale, "width") / scale + 1,
    height: getLatestPositions(auxPB, scale, "height") / scale + 1,
  };
  setPbAreaSize({
    width: pbAreaSize.width > auxSize.width ? pbAreaSize.width : auxSize.width,
    height:
      pbAreaSize.height > auxSize.height ? pbAreaSize.height : auxSize.height,
  });
  setPedalboardData({ ...auxPB });
};
