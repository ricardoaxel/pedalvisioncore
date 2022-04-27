import pedals from "../pedals.json";
import pedalboards from "../pedalboards.json";

//This functions returns the last position of an element
export const getLatestPositions = (pedalboardData, scale, type) => {
  return Math.max(
    ...Object.keys(pedalboardData).map((el) => {
      let elementTypeInfo;
      if (pedalboardData[el].type === "pedals") {
        elementTypeInfo = pedals.filter(
          (pedal) =>
            pedal.Name === pedalboardData[el].Name &&
            pedal.Brand === pedalboardData[el].Brand
        )[0];
      } else {
        elementTypeInfo = pedalboards.filter(
          (pedal) =>
            pedal.Name === pedalboardData[el].Name &&
            pedal.Brand === pedalboardData[el].Brand
        )[0];
      }
      //Auxiliar variable to see the disposition of the pedal
      let isHorizontal =
        Math.abs(pedalboardData[el].orientation) === 0 ||
        Math.abs(pedalboardData[el].orientation) === 180;
      if (type === "width") {
        return isHorizontal
          ? elementTypeInfo.Width * scale + pedalboardData[el].left
          : elementTypeInfo.Height * scale + pedalboardData[el].left;
      } else {
        return isHorizontal
          ? elementTypeInfo.Height * scale + pedalboardData[el].top
          : elementTypeInfo.Width * scale + pedalboardData[el].top;
      }
    })
  );
};
