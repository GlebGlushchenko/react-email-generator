import React, { useState } from "react";
import MyTemplate from "../template/my.template";

import { useItemsStore } from "./state/item.state";
import "react-quill/dist/quill.snow.css";
import Modal from "./Components/Modal";
import SideBar from "./Components/SideBar";
import { useModalStore } from "./state/modal.state";
import { useSideBarStore } from "./state/sideBar.state";
export interface ReactQuillInterface {
  id?: number;
  value?: string;
  ItsShow?: boolean;
  order?: number;
  isActive?: boolean;
}

export default function App() {
  const [addLinkButton, setAddLinkButton] = useState(false);

  const {
    templateSize,
    html,
    items,
    addText,
    setItems,
    showImg,
    setShowImg,
    imgUrl,
  } = useItemsStore();

  const { iframeShow } = useModalStore();
  const { inputTextValue, inputUrlValue} = useSideBarStore();

  React.useEffect(() => {
    const data: [] | null | string = localStorage.getItem("ReactState");
    const x = JSON.parse(data);
    if (x === null || x === "" || x.length === 0 || x === "[]") {
      setItems(items);
      return;
    }
    setItems(x);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("ReactState", JSON.stringify(items));
  }, [items]);
  return (
    <div className="wrapper">
      {iframeShow && <Modal html={html} />}
      <SideBar
        addLinkButton={addLinkButton}
      />
      <div className="inner">
        <h2>Это шаблон простого письма</h2>
        <div style={{ width: `${templateSize}px` }} className="inner-border">
          <MyTemplate
            content={items}
            imgUrl={imgUrl}
            showImg={showImg}
            addLinkButton={addLinkButton}
            setAddLinkButton={setAddLinkButton}
            inputTextValue={inputTextValue}
            inputUrlValue={inputUrlValue}
          />

          <div className="control-btn">
            <button className="btn" onClick={() => addText()}>
              Добавить параграф
            </button>
            <button
              className="btn"
              onClick={() => setAddLinkButton(!addLinkButton)}
              style={{
                backgroundColor: ` ${addLinkButton ? "#e39d98" : ""}`,
              }}
            >
              {`${addLinkButton ? "Удалить" : "Добавить"} кнопку`}
            </button>
            <button
              className="btn"
              onClick={() => setShowImg(!showImg)}
              style={{
                backgroundColor: ` ${showImg ? "#e39d98" : ""}`,
              }}
            >
              {`${showImg ? "Удалить" : "Добавить"} обложку`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
