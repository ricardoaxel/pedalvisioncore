export const preSetScale = (
  newScale,
  pedalboardData,
  scale,
  setPedalboardData,
  setScale
) => {
  // When the scale changes the elements positions are recalculated
  let aux2 = { ...pedalboardData };
  Object.keys(pedalboardData).map((key) => {
    aux2[key].left = (aux2[key].left * newScale) / scale;
    aux2[key].top = (aux2[key].top * newScale) / scale;
    return "";
  });
  localStorage.setItem("scale", JSON.stringify(newScale));
  setPedalboardData(aux2);
  setScale(newScale);
};
