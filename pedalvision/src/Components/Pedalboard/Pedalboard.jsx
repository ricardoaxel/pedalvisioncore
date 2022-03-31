import { Style, pedalStyle } from "./Pedalboard.css";
import { Images } from "../../assets/images";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { exampleData } from "./exampleData";

const Pedalboard = ({ children, className }) => {
  //This gave us the actual width of the window (this would be equal to the total centimenters of the pedalboard)
  const ref = useRef("");
  let pbAreaWidth = 60;
  //****RECALCULATE THE Y POSITION WHEN CHANGING THE PBAREA HEIGHT */
  const [pbAreaHeight, setPbAreaHeight] = useState(60);
  let pbAreaResponsiveWidth = ref.current.offsetWidth;
  let pbAreaResponsiveHeight =
    (pbAreaHeight * pbAreaResponsiveWidth) / pbAreaWidth;

  const [elements, setElements] = useState(
    JSON.parse(localStorage.getItem("elements"))
      ? JSON.parse(localStorage.getItem("elements"))
      : exampleData
  );

  const handleEvent = (e, data, id, index) => {
    let auxObj = {
      ...elements[index],
      x: data.lastX / pbAreaResponsiveWidth,
      y: data.lastY / pbAreaResponsiveHeight,
    };
    let auxElements = [...elements];
    auxElements[index] = auxObj;
    localStorage.setItem("elements", JSON.stringify(auxElements));
    setElements(auxElements);
  };

  // useEffect(() => {
  //   return () => {
  //     window.addEventListener("beforeunload", function (e) {
  //       return localStorage.setItem("elements", JSON.stringify(elements)); //Webkit, Safari, Chrome
  //     });
  //   };
  // });
  return (
    <div css={Style(pbAreaResponsiveHeight)} className={className} ref={ref}>
      <div className="pedalboardAreaContainer">
        {elements.map((el, index) => (
          <Draggable
            position={{
              //The position of the elements is saved on percentage because of responsive behavior
              x: el.x * pbAreaResponsiveWidth,
              y: el.y * pbAreaResponsiveHeight,
            }}
            bounds="parent"
            // onDrag={(e, data) => handleEvent(e, data, el.id, index)}
            onStop={(e, data) => handleEvent(e, data, el.id, index)}
          >
            <img
              css={pedalStyle(pbAreaWidth, el.width, pbAreaHeight, el.height)}
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
