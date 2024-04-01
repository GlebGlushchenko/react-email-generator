import React from "react";
import {
  Column,
  Row,
} from "@react-email/components";

import Paragraph from "./Paragraph";
import { ReactQuillInterface } from "../App";

interface MyRowProps {
  dragStartHandler: (item: ReactQuillInterface) => void
  dragEndHandler: (e: React.DragEvent) => void
  dragOverHandler: (e: React.DragEvent) => void
  dropHandler: (e: React.DragEvent<HTMLDivElement>, item: ReactQuillInterface) => void
  addItemHandler: (id: number) => void
  dragOn: boolean
  item: ReactQuillInterface
}

const MyRow: React.FC<MyRowProps> = (props) => {
  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
    addItemHandler,
    dragOn,
    item,
  } = props;
  const removePTags = (htmlString: string) =>
    htmlString.replace(/<p[^>]*>(.*?)<\/p>/g, "$1");

  return (
    <Row
      onDragStart={(e) => dragStartHandler(item)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, item)}
      draggable={dragOn}
      key={item.id}
    >
      <Column className="column" onClick={() => addItemHandler(item.id)}>
        <Paragraph>
          <span
            style={{ textAlign: "left" }}
            dangerouslySetInnerHTML={{
              __html: removePTags(item.value),
            }}
          ></span>
        </Paragraph>
      </Column>
    </Row>
  );
};

export default MyRow;
