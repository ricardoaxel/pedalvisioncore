import { HTMLDrag, DraggableDrag } from "./DragTypes";

export const PBElement = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  otherData,
  elementTypeInfo,
  scale,
  showTransitions,
  setShowTransitions,
  rotatePBElement,
  deletePBElement,
  updateElementLayer,
  setActualElement,
  htmlDrag,
  handleEvent,
}) => {
  if (htmlDrag) {
    return (
      <HTMLDrag
        id={id}
        left={left}
        top={top}
        elementTypeInfo={elementTypeInfo}
        hideSourceOnDrag={hideSourceOnDrag}
        scale={scale}
        showTransitions={showTransitions}
        otherData={otherData}
        setActualElement={setActualElement}
        rotatePBElement={rotatePBElement}
        deletePBElement={deletePBElement}
        updateElementLayer={updateElementLayer}
      />
    );
  } else {
    return (
      <DraggableDrag
        id={id}
        left={left}
        top={top}
        otherData={otherData}
        elementTypeInfo={elementTypeInfo}
        scale={scale}
        showTransitions={showTransitions}
        setShowTransitions={setShowTransitions}
        rotatePBElement={rotatePBElement}
        deletePBElement={deletePBElement}
        updateElementLayer={updateElementLayer}
        setActualElement={setActualElement}
        handleEvent={handleEvent}
      />
    );
  }
};
