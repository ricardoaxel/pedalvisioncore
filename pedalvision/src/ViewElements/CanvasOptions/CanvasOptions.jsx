import { Style } from "./CanvasOptions.css";
import React, { useState } from "react";
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
} from "../../Components";
import { CSSTransition } from "../../utils/GeneralImports";

export const CanvasOptions = ({
  setPbAreaSize,
  pedalboardData,
  scale,
  unitFactor,
  pbAreaSize,
  className,
  setUnitFactor,
  setScale,
  fitToWidth,
  fitToHeight,
  htmlDrag,
  setHtmlDrag,
  setFitToHeight,
  setFitToWidth,
  fillEmptySpace,
  autofillEmpty,
  setAutofillEmpty,
}) => {
  const [editOptions, setEditOptions] = useState(false);
  const preAdjustLayoutToElements = (type = "both") => {
    adjustLayoutToElements(
      type,
      setPbAreaSize,
      pedalboardData,
      scale,
      unitFactor,
      pbAreaSize
    );
  };

  const preChangeLayoutSize = (value, type) => {
    changeLayoutSize(
      value / unitFactor,
      type,
      pedalboardData,
      scale,
      setPbAreaSize,
      pbAreaSize
    );
  };
  return (
    <div css={Style()} className={`canvasOptions ${className}`}>
      <div className="topSec section">
        <div className="leftArea">
          <h2>Canvas ({unitFactor === "1" ? "in" : "cm"})</h2>
        </div>
        <div className="rightArea">
          <BsFillFileImageFill />
          <AiOutlineFilePdf />
          <AiOutlineSave />
          <BiUpload className="upload" />
        </div>
      </div>
      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="row">
          <p>Units:</p>
          <SwitchCustom
            activeSide={unitFactor === "1" ? "left" : "right"}
            leftValue={"in"}
            leftAction={() => setUnitFactor("1")}
            rightValue={"cm"}
            rightAction={() => setUnitFactor("2.54")}
          />
        </div>
      </CSSTransition>

      <div className="row rowInput">
        <p className="rowDes">
          {" "}
          Scale ({unitFactor === "2.54" ? "centimeters" : "inches"} per pixel):
        </p>
        <CSSTransition
          in={!editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <p>{scale.toFixed(2)}</p>
        </CSSTransition>
        <CSSTransition
          in={editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <>
            <InputNumberCustom
              name={"lastName"}
              value={scale.toFixed(2)}
              onChange={(e) => setScale(e.target.value)}
              disabled={fitToWidth || fitToHeight}
              dir={"rtl"}
            />
          </>
        </CSSTransition>
      </div>

      <div className="row rowInput">
        <p className="rowDes">Width:</p>
        <CSSTransition
          in={!editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <p>{(pbAreaSize.width * unitFactor).toFixed(2)}</p>
        </CSSTransition>
        <CSSTransition
          in={editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <InputNumberCustom
            dir="rtl"
            name="lastName"
            value={(pbAreaSize.width * unitFactor).toFixed(2)}
            onChange={(e) => {
              preChangeLayoutSize(e.target.value, "width");
            }}
          />
        </CSSTransition>
      </div>

      <div className="row rowInput">
        <p className="rowDes">Height:</p>

        <CSSTransition
          in={!editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <p>{(pbAreaSize.height * unitFactor).toFixed(2)}</p>
        </CSSTransition>
        <CSSTransition
          in={editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <InputNumberCustom
            dir="rtl"
            name="lastName"
            value={(pbAreaSize.height * unitFactor).toFixed(2)}
            onChange={(e) => {
              preChangeLayoutSize(e.target.value, "height");
            }}
          />
        </CSSTransition>
      </div>

      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="section">
          <div className="row">
            Fit to View
            <SwitchCustom
              activeSide={fitToWidth ? "left" : fitToHeight ? "right" : ""}
              leftValue={"width"}
              leftAction={() => {
                setFitToWidth(!fitToWidth);
                setFitToHeight(false);
              }}
              rightValue={"height"}
              rightAction={() => {
                setFitToHeight(!fitToHeight);
                setFitToWidth(false);
              }}
            />
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="section fillsSec">
          <div className="row">Adjust canvas to last elements:</div>
          <div className="row">
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => preAdjustLayoutToElements("both")}
            >
              <BsArrowsAngleContract size={15} />
            </ButtonCustom>

            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => preAdjustLayoutToElements("width")}
            >
              <BsArrowsAngleContract
                size={15}
                style={{ transform: "rotate(45deg)" }}
              />
            </ButtonCustom>

            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => preAdjustLayoutToElements("height")}
            >
              <BsArrowsAngleContract
                size={11}
                style={{ transform: "rotate(135deg)", padding: ".05rem" }}
              />
            </ButtonCustom>
          </div>
          <div className="row">Fill empty space:</div>
          <div className="row">
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => fillEmptySpace()}
            >
              <IoIosResize size={15} />
            </ButtonCustom>
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => fillEmptySpace("width")}
            >
              <MdHeight size={15} style={{ transform: "rotate(90deg)" }} />
            </ButtonCustom>
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => fillEmptySpace("height")}
            >
              <MdHeight size={15} />
            </ButtonCustom>
          </div>
          <label className="row">
            Autofill empty space
            <InputCheckboxCustom
              checked={autofillEmpty}
              onChange={() => setAutofillEmpty(!autofillEmpty)}
            />
          </label>
        </div>
      </CSSTransition>
      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="section helpSec">
          <p>It's something wrong with the Drag N Drop?</p>

          <label className="rowLabel">
            <InputCheckboxCustom
              checked={htmlDrag}
              onChange={() => setHtmlDrag(!htmlDrag)}
            />
            Active HTML 5 DND
          </label>
        </div>
      </CSSTransition>

      <ButtonCustom
        // style={editOptions ? { backgroundColor: "#8aa8d3" } : {}}
        onClick={() => setEditOptions(!editOptions)}
        type="submit"
        className={editOptions ? "greyBtn" : ""}
      >
        {editOptions ? (
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
          <>Edit Canvas</>
        )}
      </ButtonCustom>
    </div>
  );
};
