export const movePBElement = (
  direction,
  num,
  actualElement,
  setPedalboardData
) => {
  let auxPB = { ...JSON.parse(localStorage.getItem("pedalboardData")) };
  if (
    auxPB[actualElement.current.id][direction] +
      num * JSON.parse(localStorage.getItem("scale")) <
    0
  ) {
    num = 0;
  }
  let isHorizontal =
    Math.abs(actualElement.current.particularInfo.orientation) === 0 ||
    Math.abs(actualElement.current.particularInfo.orientation) === 180;
  if (
    auxPB[actualElement.current.id][direction] +
      num * JSON.parse(localStorage.getItem("scale")) +
      actualElement.current.elTypeInfo[
        direction === "top"
          ? isHorizontal
            ? "Height"
            : "Width"
          : isHorizontal
          ? "Width"
          : "Height"
      ] *
        JSON.parse(localStorage.getItem("scale")) >
    JSON.parse(localStorage.getItem("pbAreaSize"))[
      direction === "top" ? "height" : "width"
    ] *
      JSON.parse(localStorage.getItem("scale"))
  ) {
    num = 0;
  }
  auxPB[actualElement.current.id][direction] =
    auxPB[actualElement.current.id][direction] +
    num * JSON.parse(localStorage.getItem("scale"));

  setPedalboardData({ ...auxPB });
};
