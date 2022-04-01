import { Style, pedalStyle } from "./Pedalboard.css";
import { Images } from "../../assets/images";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { exampleData } from "./exampleData";

const Pedalboard = ({ children, className }) => {
  //****RECALCULATE PEDALS POSITION WHEN CHANGING THE PBAREA HEIGHT */
  const [lastScale, setLastScale] = useState(1);
  const [scale, setScale] = useState(8);
  const [elements, setElements] = useState(
    JSON.parse(localStorage.getItem("elements"))
      ? JSON.parse(localStorage.getItem("elements"))
      : exampleData
  );

  const handleEvent = (e, data, id, index) => {
    let auxObj = {
      ...elements[index],
      x: data.lastX,
      y: data.lastY,
    };
    let auxElements = [...elements];
    auxElements[index] = auxObj;
    localStorage.setItem("elements", JSON.stringify(auxElements));
    setElements(auxElements);
  };

  useEffect(() => {
    // el.x * lastScale gives the position in pixels of last scale to know the
    // new one we have to divide it into the new scale
    let auxelems = elements.map((el) => ({
      ...el,
      x: (el.x * scale) / lastScale,
      y: (el.y * scale) / lastScale,
    }));
    setElements(auxelems);
    setLastScale(scale);
  }, [scale]);

  return (
    <div css={Style()} className={className}>
      <div className="pedalboardAreaContainer">
        {/* <input
          type="text"
          value={scale}
          onChange={(e) => setScale(parseInt(e.target.value))}
        /> */}
        {elements.map((el, index) => (
          <Draggable
            position={{
              //The position of the elements is saved on percentage because of responsive behavior
              x: el.x,
              y: el.y,
            }}
            bounds="parent"
            // onDrag={(e, data) => handleEvent(e, data, el.id, index)}
            onStop={(e, data) => handleEvent(e, data, el.id, index)}
          >
            <img
              css={pedalStyle(el.width, el.height, scale)}
              // src={"/../../assets/Images/rat.png"}
              src={require(`../../assets/Images/${el.type}/${el.elementImage}`)}
              //To avoid the default HTML5 drag API
              draggable="false"
              alt=""
            />
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export { Pedalboard };
