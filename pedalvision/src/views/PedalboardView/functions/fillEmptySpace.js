export const fillEmptySpace = (
  type = "both",
  setPbAreaSize,
  availableWidth,
  scale,
  pbAreaSize,
  pbScrollBarSize,
  availableHeight
) => {
  setPbAreaSize({
    width:
      (type === "width" || type === "both") &&
      pbAreaSize.width < availableWidth / scale
        ? availableWidth / scale - pbScrollBarSize.width / scale
        : pbAreaSize.width,
    height:
      (type === "height" || type === "both") &&
      pbAreaSize.height < availableHeight / scale
        ? availableHeight / scale - pbScrollBarSize.height / scale
        : pbAreaSize.height,
  });
};
