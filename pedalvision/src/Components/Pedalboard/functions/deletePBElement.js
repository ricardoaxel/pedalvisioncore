export const deletePBElement = (id, pedalboardData, setPedalboardData) => {
  let auxPBData = { ...pedalboardData };
  delete auxPBData[id];
  setPedalboardData({ ...auxPBData });
};
