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

  const memoizedComponent = useMemo(
    () => (
      <Row
        onDragStart={() => dragStartHandler(item)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, item)}
        draggable={dragOn}
        key={item.id}
       
      >
        {item.isBorderColor ?  <Column
          // style={{ fontSize: "14px" }}
          className={`column ${item.isActive ? "active" : ""}`}
          onClick={() => chooseItemHandler(item.id)}
          draggable={dragOn}
          style={{
            borderCollapse: "collapse",
            padding: "20px",
            borderColor: "#09c074",
            borderStyle: "solid",
            borderWidth: "20px",
            lineHeight: "130%",
            borderImage: "linear-gradient(to bottom right, #570eaa 0%, #09c074 100%)",
            borderImageSlice: "1",
            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
            margin: "0px auto",
            maxWidth: "900px",
          }}
        >
          <Paragraph isPositionCenter={item.isPositionCenter}>
            <span
              style={{ textAlign: "left" }}
              dangerouslySetInnerHTML={{
                __html: removePTags(item.value),
              }}
            ></span>
          </Paragraph>
        </Column> : <Column
          // style={{ fontSize: "14px" }}
          className={`column ${item.isActive ? "active" : ""}`}
          onClick={() => chooseItemHandler(item.id)}
          draggable={dragOn}
          style={{
            fontSize: "14px",
          }}
        >
          <Paragraph isPositionCenter={item.isPositionCenter}>
            <span
              style={{ textAlign: "left" }}
              dangerouslySetInnerHTML={{
                __html: removePTags(item.value),
              }}
            ></span>
          </Paragraph>
        </Column>}
      </Row>
    ),
    [item]
  );

  return memoizedComponent;
};

export default MyRow;
