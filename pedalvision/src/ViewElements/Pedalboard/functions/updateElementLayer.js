export const updateElementLayer = (
  id,
  num,
  pedalboardData,
  setPedalboardData
) => {
  let auxPB = { ...pedalboardData };
  let newNum = parseInt(auxPB[id]["layer"]) + num;
  auxPB[id]["layer"] = newNum < 1 ? 1 : newNum > 10 ? 10 : newNum;
  setPedalboardData({ ...auxPB });
};
