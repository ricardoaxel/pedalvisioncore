import pedals from "../../../utils/pedals.json";
import pedalboards from "../../../utils/pedalboards.json";

export const addElement = (
  elementIndex,
  type,
  pedalboardData,
  pbAreaSize,
  scale,
  setPbAreaSize,
  setPedalboardData
) => {
  let elementTypeInfo;
  if (type === "pedals") {
    elementTypeInfo = pedals[elementIndex];
  } else {
    elementTypeInfo = pedalboards[elementIndex];
  }
  let auxObj = {
    left: 0,
    top: 0,
    type: type,
    Name: elementTypeInfo.Name,
    Brand: elementTypeInfo.Brand,
    orientation: 0,
    //Obtaining the last layer
    layer:
      Object.values(pedalboardData).length > 0
        ? Math.max(...Object.values(pedalboardData).map((el) => el.layer))
        : 1,
  };
  //This validation change the size of the actual area to work in case the element doesn't fit
  let auxPB = { ...pedalboardData };
  auxPB[Math.random().toString(16).slice(2)] = auxObj;
  let changeSize = false;
  let auxNewSize = { ...pbAreaSize };
  if (elementTypeInfo.Width * scale + 5 > pbAreaSize.width * scale) {
    auxNewSize = {
      ...auxNewSize,
      width: elementTypeInfo.Width + 10,
    };
    changeSize = true;
  }
  if (elementTypeInfo.Height * scale + 5 > pbAreaSize.height * scale) {
    auxNewSize = {
      ...auxNewSize,
      height: elementTypeInfo.Height + 10,
    };
    changeSize = true;
  }
  if (changeSize) {
    setPbAreaSize(auxNewSize);
  }
  setPedalboardData(auxPB);
};
