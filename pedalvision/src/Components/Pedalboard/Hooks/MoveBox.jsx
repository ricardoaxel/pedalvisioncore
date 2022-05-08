import { useCallback } from "react";
import update from "immutability-helper";

export const MoveBox = () => {
  const moveBox = useCallback(
    (
      id,
      left,
      top,
      elementTypeInfo,
      pedalboardData,
      scale,
      pbAreaSize,
      setPedalboardData
    ) => {
      console.log(id, left, top, elementTypeInfo);
      //Validations to avoid image traspasing available area
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }
      let isHorizontal =
        Math.abs(pedalboardData[id].orientation) === 0 ||
        Math.abs(pedalboardData[id].orientation) === 180;

      if (
        left + elementTypeInfo[isHorizontal ? "Width" : "Height"] * scale >
        pbAreaSize.width * scale
      ) {
        left =
          pbAreaSize.width * scale -
          elementTypeInfo[isHorizontal ? "Width" : "Height"] * scale;
      }
      if (
        top + elementTypeInfo[isHorizontal ? "Height" : "Width"] * scale >
        pbAreaSize.height * scale
      ) {
        top =
          pbAreaSize.height * scale -
          elementTypeInfo[isHorizontal ? "Height" : "Width"] * scale;
      }

      setPedalboardData(
        update(pedalboardData, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [pedalboardData]
  );

  return { moveBox };
};
