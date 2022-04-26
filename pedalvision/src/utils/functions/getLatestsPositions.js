import pedals from "../pedals.json";
import pedalboards from "../pedalboards.json";

//This functions returns the last position of an element
export const getLatestPositions = (pedalboardData, scale, type) => {
  return Math.max(
    ...pedalboardData.map((el) => {
      let elementTypeInfo;
      if (el.type === "pedals") {
        elementTypeInfo = pedals.filter(
          (pedal) => pedal.Name === el.Name && pedal.Brand === el.Brand
        )[0];
      } else {
        elementTypeInfo = pedalboards.filter(
          (pedal) => pedal.Name === el.Name && pedal.Brand === el.Brand
        )[0];
      }
      //Auxiliar variable to see the disposition of the pedal
      let isHorizontal =
        Math.abs(el.orientation) === 0 || Math.abs(el.orientation) === 180;
      if (type === "width") {
        return isHorizontal
          ? elementTypeInfo.Width * scale + el.x
          : elementTypeInfo.Height * scale + el.x;
      } else {
        return isHorizontal
          ? elementTypeInfo.Height * scale + el.y
          : elementTypeInfo.Width * scale + el.y;
      }
    })
  );
};
