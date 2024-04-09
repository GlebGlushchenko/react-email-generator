import React, { useMemo } from "react";
import { Column, Row } from "@react-email/components";

import Paragraph from "./Paragraph";
import { removePTags } from "../utils/removeTags";
import { useItemsStore } from "../state/item.state";
import { ReactQuillInterface } from "../types/reactQuillInterface";

interface MyRowProps {
  dragStartHandler: (item: ReactQuillInterface) => void;
  dragEndHandler: (e: React.DragEvent) => void;
  dragOverHandler: (e: React.DragEvent) => void;
  dropHandler: (
    e: React.DragEvent<HTMLDivElement>,
    item: ReactQuillInterface
  ) => void;
  chooseItemHandler: (id: number) => void;
  item: ReactQuillInterface;
}

const MyRow: React.FC<MyRowProps> = (props) => {
  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
    chooseItemHandler,
    item,
  } = props;

  const { dragOn } = useItemsStore();

  const memoizedComponent = useMemo(() => (
    <Row
      onDragStart={() => dragStartHandler(item)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, item)}
      draggable={dragOn}
      key={item.id}
    >
      <Column
        style={{ fontSize: "14px" }}
        className={`column ${item.isActive ? "active" : ""}`}
        onClick={() => chooseItemHandler(item.id)}
        draggable={dragOn}
      >
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
  ), [item]);

  return memoizedComponent;
};

export default MyRow;