import React from "react";

import ReactQuill from "react-quill";
import { ReactQuillInterface } from "../App";

interface ReactQillRedactorProps {
  item: ReactQuillInterface;
  templateSize: number;
  addText: () => void;
  addLinkButton: boolean
  setAddLinkButton: (e: boolean) => void
}


const ReactQillRedactor: React.FC<ReactQillRedactorProps> = (props) => {
  const { item, templateSize } = props;
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
        ></ReactQuill>
      </div>

    </div>
  );
};

export default ReactQillRedactor;
