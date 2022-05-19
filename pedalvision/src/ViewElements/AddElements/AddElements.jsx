import { Style } from "./AddElements.css";
import React, { useState, useEffect } from "react";
import { changeLayoutSize, adjustLayoutToElements } from "./functions";
import { BiUpload } from "react-icons/bi";
import {
  AiOutlineFilePdf,
  AiOutlineSave,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { MdHeight } from "react-icons/md";
import { IoIosResize } from "react-icons/io";
import { BsFillFileImageFill, BsArrowsAngleContract } from "react-icons/bs";
import {
  ButtonCustom,
  InputNumberCustom,
  InputCheckboxCustom,
  SwitchCustom,
  SelectCustom,
} from "../../Components";
import { CSSTransition } from "../../utils/GeneralImports";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";

export const AddElements = ({
  className,
  addElement,
  pedalboardData,
  pbAreaSize,
  scale,
  setPbAreaSize,
  setPedalboardData,
  htmlDrag,
}) => {
  const [elementType, setElementType] = useState("pedals");
  const [pedalOptions, setPedalOptions] = useState({});
  const [pedalboardOptions, setPedalboardOptions] = useState({});
  const [hideOptions, setHideOptions] = useState(true);
  const [showCustomElement, setShowCustomElement] = useState(false);
  const [customElementData, setCustomElementData] = useState({
    type: "pedals",
  });

  useEffect(() => {
    let auxPedalOptions = {};
    for (let i = 0; i <= pedals.length - 1; i++) {
      let pedal = pedals[i];
      auxPedalOptions[pedal.Brand] = auxPedalOptions[pedal.Brand]
        ? [...auxPedalOptions[pedal.Brand], { Name: pedal.Name, index: i }]
        : [{ Name: pedal.Name, index: i }];
    }
    let auxPedalboardOptions = {};

    for (let i = 0; i <= pedalboards.length - 1; i++) {
      let pedalboard = pedalboards[i];
      auxPedalboardOptions[pedalboard.Brand] = auxPedalboardOptions[
        pedalboard.Brand
      ]
        ? [
            ...auxPedalboardOptions[pedalboard.Brand],
            { Name: pedalboard.Name, index: i },
          ]
        : [{ Name: pedalboard.Name, index: i }];
    }
    setPedalOptions(auxPedalOptions);
    setPedalboardOptions(auxPedalboardOptions);
  }, []);

  return (
    <div
      css={Style()}
      className={`canvasOptions ${className}`}
      onMouseEnter={() => {
        setHideOptions(false);
      }}
      onMouseLeave={() => setHideOptions(true)}
    >
      <div>
        <h2>Add Element</h2>
        <div className="row elementType">
          <p
            className={elementType === "pedals" ? "active" : ""}
            onClick={() => setElementType("pedals")}
          >
            Pedal
          </p>
          <p
            className={elementType === "pedalboards" ? "active" : ""}
            onClick={() => setElementType("pedalboards")}
          >
            Pedalboard
          </p>
        </div>
        <div className="margins">
          {/* To avoid load of data if the options aren't used */}
          {!hideOptions || htmlDrag ? (
            <SelectCustom
              onChange={(e) =>
                addElement(
                  e.target.value,
                  elementType,
                  pedalboardData,
                  pbAreaSize,
                  scale,
                  setPbAreaSize,
                  setPedalboardData
                )
              }
            >
              {elementType === "pedalboards"
                ? Object.keys(pedalboardOptions).map((brand) => (
                    <optgroup label={brand}>
                      {pedalboardOptions[brand].map((pedalboard) => (
                        <option key={pedalboard.index} value={pedalboard.index}>
                          {pedalboard.Name}
                        </option>
                      ))}
                    </optgroup>
                  ))
                : Object.keys(pedalOptions).map((brand) => (
                    <optgroup label={brand}>
                      {pedalOptions[brand].map((pedal) => (
                        <option key={pedal.index} value={pedal.index}>
                          {pedal.Name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
            </SelectCustom>
          ) : (
            <SelectCustom>
              {elementType === "pedalboards" ? (
                <option key={0} value={0}>
                  {pedalboards[0].Name}
                </option>
              ) : (
                <option key={0} value={0}>
                  {pedals[0].Name}
                </option>
              )}
            </SelectCustom>
          )}
        </div>
      </div>

      <CSSTransition
        in={showCustomElement}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div>
          <h2>Add Custom Element</h2>
          <div className="row elementType">
            <p
              className={customElementData.type === "pedals" ? "active" : ""}
              onClick={() =>
                setCustomElementData({ ...customElementData, type: "pedals" })
              }
            >
              Pedal
            </p>
            <p
              className={
                customElementData.type === "pedalboards" ? "active" : ""
              }
              onClick={() =>
                setCustomElementData({
                  ...customElementData,
                  type: "pedalboards",
                })
              }
            >
              Pedalboard
            </p>
          </div>
          <div className="margins">
            {/* To avoid load of data if the options aren't used */}
            <div className="row">
              <p className="rowDes">Width:</p>
              <InputNumberCustom
                dir="rtl"
                name="lastName"
                // value={(pbAreaSize.width * unitFactor).toFixed(2)}
                // onChange={(e) => {
                //   preChangeLayoutSize(e.target.value, "width");
                // }}
              />
            </div>
          </div>
          <div className="margins">
            {/* To avoid load of data if the options aren't used */}
            <div className="row">
              <p className="rowDes">Height:</p>
              <InputNumberCustom
                dir="rtl"
                name="lastName"
                // value={(pbAreaSize.width * unitFactor).toFixed(2)}
                // onChange={(e) => {
                //   preChangeLayoutSize(e.target.value, "width");
                // }}
              />
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* <ButtonCustom
        onClick={() => setShowCustomElement(!showCustomElement)}
        type="submit"
      >
        {showCustomElement ? (
          <>
            {" "}
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiOutlineArrowUp />
              Hide Options
            </p>
          </>
        ) : (
          <>Add Custom Element</>
        )}
      </ButtonCustom> */}
    </div>
  );
};
