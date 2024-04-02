import React from "react";
import MyTemplate from "../template/my.template";
import { render } from "@react-email/components";
import { downloadFile } from "./utils/downloadFile";

import "react-quill/dist/quill.snow.css";
import Modal from "./Components/Modal";
import SideBar from "./Components/SideBar";
import ReactQillRedactor from "./Components/ReactQillRedactor";
export interface ReactQuillInterface {
  id: number;
  value: string;
  ItsShow: boolean;
  order: number;
  isActive: boolean
}

export default function App() {
  const initialState = [{ id: 1, value: "Это параграф!", ItsShow: true, order: 1, isActive: false }];
  const [templateSize, setTemplateSize] = React.useState<number>(900);
  const [reactQuillValue, setReactQuillValue] = React.useState<ReactQuillInterface[]>(initialState);
  const [iframeShow, setIframeShow] = React.useState(false);
  const [html, setHtml] = React.useState("");
  const [siteBarRedactorValue, setSideBarRedactorValue] = React.useState(null);

  const [inputUrlValue, setInputUrlValue] = React.useState<string>("");
  const [inputTextValue, setInputTextValue] = React.useState<string>("");

  const [addLinkButton, setAddLinkButton ] = React.useState(false)

  React.useEffect(() => {
    const data = localStorage.getItem("ReactValue");

    if(data === null || data === '') {
      setReactQuillValue(initialState);
      return
    } 
    setReactQuillValue(JSON.parse(data));
  }, []);

  const choseTemplateSize = (format: string) => {
    format === "mobile" ? setTemplateSize(400) : setTemplateSize(900);
  };

  const renderPreview = () => {
    const emailHTML = render(
      <MyTemplate
        size={templateSize}
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
      <MyTemplate size={templateSize} content={reactQuillValue} inputTextValue={inputTextValue} inputUrlValue={inputUrlValue} addLinkButton={addLinkButton}/>
    );

    downloadHtml(emailHTML);
  };

  const downloadHtml = (html) => {
    downloadFile(html, "email.html");
  };
  const addText = (id: number) => {
    setReactQuillValue((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          value: "",
          ItsShow: true,
          order: Date.now(),
          isActive: false
        },
      ];
    });
    setReactQuillValue((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return { ...item, ItsShow: false };
        }
        return item;
      });
    });

    localStorage.setItem("ReactValue", JSON.stringify(reactQuillValue));
  };

  const changeValueHandler = (value, id) => {
    setReactQuillValue((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return { ...item, value: value };
        }
        return item;
      });
    });
  };

  const clearHandler = () => {
    setReactQuillValue(initialState);
    localStorage.setItem("ReactValue", "");
  };

  const addItemHandler = (id: number) => {
    const findElement = reactQuillValue.find((i) => i.id === id);
    toggleNavbar();
    
    setSideBarRedactorValue(findElement);

    setReactQuillValue((prev) => {
      return prev.map((item) => {
        if (item.id === findElement.id) {
          return { ...item, isActive: true };
        }
        return { ...item, isActive: false};
      });
    })
  };

  const onChangeHandler = (val: string) => {
    setSideBarRedactorValue((prev) => {
      return { ...prev, value: val };
    });
  };

  const changeFragment = (obj) => {
    setReactQuillValue((prevState) => {
      return prevState.map((item) => {
        if (item.id === obj.id) {
          return { ...item, value: siteBarRedactorValue.value };
        }
        return item;
      });
    });
  };

  const removeFragmentHandler = (item: ReactQuillInterface) => {
    setReactQuillValue((prev) => {
      return prev.filter((i) => i.id !== item.id);
    });

    setSideBarRedactorValue("");
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleNavbar = () => {
    setIsOpen(true);
  };

  const showIframe = () => {
    renderPreview();
    setIframeShow(!iframeShow);
  };

  React.useEffect(() => {
    if (iframeShow) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [iframeShow]);

  const [currentItem, setCurrentItem] = React.useState(null);
  const [dragOn, setDragOn] = React.useState(true);

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
  const dropHandler = (e, item) => {
    e.preventDefault();

    setReactQuillValue(
      reactQuillValue.map((i) => {
        if (i.id === item.id) {
          return { ...i, order: currentItem.order };
        }

        if (i.id === currentItem.id) {
          return { ...i, order: item.order };
        }
        return i;
      })
    );

    e.target.classList.remove("drag-over");
  };

  return (
    <div className="wrapper">
      {iframeShow && <Modal setIframeShow={setIframeShow} html={html} />}
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        choseTemplateSize={choseTemplateSize}
        showIframe={showIframe}
        renderHtml={renderHtml}
        clearHandler={clearHandler}
        setDragOn={setDragOn}
        dragOn={dragOn}
        onChangeHandler={onChangeHandler}
        siteBarRedactorValue={siteBarRedactorValue}
        changeFragment={changeFragment}
        removeFragmentHandler={removeFragmentHandler}
        inputUrlValue={inputUrlValue}
        setInputUrlValue={setInputUrlValue}
        inputTextValue={inputTextValue}
        setInputTextValue={setInputTextValue}
      />
      <div className="inner">
        <h2>Это шаблон № 1</h2>
        <div style={{ width: `${templateSize}px` }} className="inner-border">
          <MyTemplate
            size={templateSize}
            content={reactQuillValue}
            addItemHandler={addItemHandler}
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
          {reactQuillValue.map(
            (item) =>
              item.ItsShow && (
                <ReactQillRedactor
                  item={item}
                  templateSize={templateSize}
                  changeValueHandler={changeValueHandler}
                  addText={addText}
                  addLinkButton={addLinkButton}
                  setAddLinkButton={setAddLinkButton}
                  key={item.id
                  }

                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
