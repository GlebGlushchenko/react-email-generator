import React from "react";
import MyTemplate from "../template/my.template";
import { render } from "@react-email/components";
import { downloadFile } from "./utils/downloadFile";

import { useItemsStore } from "./state/item.state";
import "react-quill/dist/quill.snow.css";
import Modal from "./Components/Modal";
import SideBar from "./Components/SideBar";
import { useSideBarStore } from "./state/sideBar.state";
import { useModalStore } from "./state/modal.state";
import { useDragStore } from "./state/drag.state";
export interface ReactQuillInterface {
  id?: number;
  value?: string;
  ItsShow?: boolean;
  order?: number;
  isActive?: boolean;
}

export default function App() {
  const [inputUrlValue, setInputUrlValue] = React.useState<string>(
    "https://www.google.com/"
  );
  const [inputTextValue, setInputTextValue] =
    React.useState<string>("Это кнопка!");

  const [addLinkButton, setAddLinkButton] = React.useState(false);


// ZUSLAND
  const size = useItemsStore(state => state.templateSize)

  const setHtml = useItemsStore(state => state.setHtml)
  const html = useItemsStore(state => state.html)

  const reactQuillValue = useItemsStore(state => state.items)
  const addText = useItemsStore(state => state.addText)

  const allClear = useItemsStore(state => state.allClear)
  const setSideBarItemValue = useItemsStore(state => state.setSideBarItemValue)
  const chooseItem = useItemsStore(state => state.chooseItem)

  const changeFragment = useItemsStore(state => state.changeFragment)
  const removeFragmentHandler = useItemsStore(state => state.removeFragmentHandler)
  const dropHandler = useItemsStore(state => state.changeOrder)

  const setSideBarRedactorItem = useItemsStore(state => state.setSideBarRedactorItem)
  const sideBarItem = useItemsStore(state => state.sideBarItem)
  const setItems = useItemsStore(state => state.setItems)

  const setOpenSideBar = useSideBarStore(state => state.setOpenSideBar)

  const iframeShow = useModalStore(state => state.iframeShow)
  const setIframeShow = useModalStore(state => state.setIframeShow)
  
  const setCurrentItem = useItemsStore(state => state.setCurrentItem)

  const dragOn = useDragStore(state => state.dragOn)
  const setDragOn = useDragStore(state => state.setDragOn)
  ////////




  React.useEffect(() => {
    const data: [] | null | string = localStorage.getItem("ReactState");
    const x = JSON.parse(data)
    if (x === null || x === "" || x.length === 0 || x === '[]')  {
      setItems(reactQuillValue);
      return;
    }
    setItems(x);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("ReactState",JSON.stringify(reactQuillValue))
  
  }, [reactQuillValue])

  const renderPreview = () => {
    const emailHTML = render(
      <MyTemplate
        size={size}
        content={reactQuillValue}
        inputTextValue={inputTextValue}
        inputUrlValue={inputUrlValue}
        addLinkButton={addLinkButton}
      />
    );

    setHtml(emailHTML);
  };

  const renderHtml = () => {
    const emailHTML = render(
      <MyTemplate
        size={size}
        content={reactQuillValue}
        inputTextValue={inputTextValue}
        inputUrlValue={inputUrlValue}
        addLinkButton={addLinkButton}
      />
    );

    downloadFile(emailHTML, "email.html");
  };

  const chooseItemHandler = (id: number) => {
    const findElement = reactQuillValue.find((i) => i.id === id);
    setOpenSideBar(true);

    setSideBarRedactorItem(findElement);
    chooseItem(id)
   
  };

  const showIframe = () => {
    renderPreview();
    setIframeShow(!iframeShow);
  };



  const dragStartHandler = (item: ReactQuillInterface) => {
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {
    e.target.classList.remove("drag-over");
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  };

  return (
    <div className="wrapper">
      {iframeShow && <Modal html={html} />}
      <SideBar
        showIframe={showIframe}
        renderHtml={renderHtml}
        clearHandler={allClear}
        setDragOn={setDragOn}
        dragOn={dragOn}
        setSideBarItemValue={setSideBarItemValue}
        sideBarItem={sideBarItem}
        changeFragment={changeFragment}
        removeFragmentHandler={removeFragmentHandler}
        inputUrlValue={inputUrlValue}
        setInputUrlValue={setInputUrlValue}
        inputTextValue={inputTextValue}
        setInputTextValue={setInputTextValue}
        addLinkButton={addLinkButton}
      />
      <div className="inner">
        <h2>Это шаблон простого письма</h2>
        <div style={{ width: `${size}px` }} className="inner-border">
            <MyTemplate
              size={size}
              content={reactQuillValue}
              chooseItemHandler={chooseItemHandler}
              dragStartHandler={dragStartHandler}
              dropHandler={dropHandler}
              dragEndHandler={dragEndHandler}
              dragOverHandler={dragOverHandler}
              dragOn={dragOn}
              inputTextValue={inputTextValue}
              addLinkButton={addLinkButton}
              setAddLinkButton={setAddLinkButton}
              inputUrlValue={inputUrlValue}
            />

          <div className="control-btn">
  
            <button
              onClick={() => addText()}
              style={{ margin: "20px 10px 0 0", padding: "20px" }}
            >
              Добавить параграф
            </button>
            <button
              onClick={() => setAddLinkButton(!addLinkButton)}
              style={{
                margin: "20px 0 0 0",
                padding: "20px",
                backgroundColor: ` ${addLinkButton ? "#e39d98" : ""}`,
              }}
            >
              {`${addLinkButton ? "Удалить" : "Добавить"} кнопку`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
