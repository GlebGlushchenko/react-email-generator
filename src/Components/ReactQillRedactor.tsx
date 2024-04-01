import React from "react";

import ReactQuill from "react-quill";
import { ReactQuillInterface } from "../App";

interface ReactQillRedactorProps {
  item: ReactQuillInterface;
  templateSize: number;
  changeValueHandler: (value: string, id: number) => void;
  addText: (id: number) => void;
  addLinkButton: boolean
  setAddLinkButton: (e: boolean) => void
}


const ReactQillRedactor: React.FC<ReactQillRedactorProps> = (props) => {
  const { item, templateSize, changeValueHandler, addText, addLinkButton, setAddLinkButton } = props;
  return (
    <div
      className="container"
      key={item.id}
      style={{ width: `${templateSize}px`, marginBottom: "50px" }}
    >
      <div className="side-bar-redactor">
        <ReactQuill
          theme={"bubble"}
          value={item.value}
          onChange={(value) => changeValueHandler(value, item.id)}
        ></ReactQuill>
      </div>

      <button
        onClick={() => addText(item.id)}
        style={{ margin: "20px 10px 0 0", padding: "20px" }}
      >
        Добавить параграф
      </button>
      <button
        onClick={() => setAddLinkButton(!addLinkButton)}
        style={{ margin: "20px 0 0 0", padding: "20px", backgroundColor: ` ${addLinkButton ? '#e39d98' : ''}` }}
      >
        {`${addLinkButton ? 'Удалить' : 'Добавить'} кнопку`}</button>
    </div>
  );
};

export default ReactQillRedactor;
