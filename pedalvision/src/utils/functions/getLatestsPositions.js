import pedals from "../pedals.json";
import pedalboards from "../pedalboards.json";

//This functions returns the last position of an element
export const getLatestPositions = (pedalboardData, scale, type) => {
  let auxPedalboard = { ...pedalboardData };
  return Math.max(
    ...Object.keys(pedalboardData).map((el) => {
      let elementTypeInfo;
      if (auxPedalboard[el].type === "pedals") {
        elementTypeInfo = pedals.filter(
          (pedal) =>
            pedal.Name === auxPedalboard[el].Name &&
            pedal.Brand === auxPedalboard[el].Brand
        )[0];
      } else {
        elementTypeInfo = pedalboards.filter(
          (pedal) =>
            pedal.Name === auxPedalboard[el].Name &&
            pedal.Brand === auxPedalboard[el].Brand
        )[0];
      }
      //Auxiliar variable to see the disposition of the pedal
      let isHorizontal =
        Math.abs(auxPedalboard[el].orientation) === 0 ||
        Math.abs(auxPedalboard[el].orientation) === 180;
      if (type === "width") {
        return isHorizontal
          ? elementTypeInfo.Width * scale + auxPedalboard[el].left
          : elementTypeInfo.Height * scale + auxPedalboard[el].left;
      } else {
        return isHorizontal
          ? elementTypeInfo.Height * scale + auxPedalboard[el].top
          : elementTypeInfo.Width * scale + auxPedalboard[el].top;
      }
    })
  );
};
