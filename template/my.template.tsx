import React from "react";
import {
  Font,
  Head,
  Heading,
  Html,
  Section,
} from "@react-email/components";
import { sortItem } from "../src/utils/sortItem.js";
import MyRow from "../src/Components/MyRow.js";
import EmptyRow from "../src/Components/EmptyRow.js";
import MyButton from "../src/Components/MyButton.js";
import { ReactQuillInterface } from "../src/App.js";

interface MyTemplateProps {
  size: number
  content: ReactQuillInterface[]
  inputTextValue: string
  inputUrlValue: string
  addLinkButton: boolean

  reactQuillValue?: ReactQuillInterface[]
  addItemHandler?: (id: number) => void
  dragStartHandler?: (item: ReactQuillInterface) => void
  dropHandler?: (e: React.DragEvent<HTMLDivElement>, item: ReactQuillInterface) => void
  dragEndHandler?: (e: React.DragEvent<HTMLDivElement>) => void
  dragOverHandler?: (e: React.DragEvent<HTMLDivElement>) => void
  dragOn?: boolean
  removeFragmentHandler?: () => void
  setAddLinkButton?: (val: boolean) => void
}
const MyTemplate:React.FC<MyTemplateProps> = (props) => {
  const {
    size,
    reactQuillValue,
    addItemHandler,
    dragStartHandler,
    dropHandler,
    dragEndHandler,
    dragOverHandler,
    dragOn,
    inputTextValue,
    inputUrlValue,
    addLinkButton,
  } = props;
  return (
    <>
      <Html lang="ru">
        <Head>
          <Font
            fontFamily="Arial, Helvetica, sans-serif"
            fallbackFontFamily="Verdana"
            // webFont={{
            //   url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            //   format: "woff2",
            // }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Section width={props.size}>
          <Heading as="h3">Здравствуйте, *|APPEAL_NAME|*!</Heading>
          {props.content.sort(sortItem).map((item) => {
            if (item.value !== "") {
              return (
                <MyRow
                  item={item}
                  addItemHandler={addItemHandler}
                  dragStartHandler={dragStartHandler}
                  dropHandler={dropHandler}
                  dragEndHandler={dragEndHandler}
                  dragOverHandler={dragOverHandler}
                  dragOn={dragOn}
                  key={item.id}
                />
              );
            }
            return (
              <EmptyRow
                item={item}
                size={size}
                content={reactQuillValue}
                addItemHandler={addItemHandler}
                dragStartHandler={dragStartHandler}
                dropHandler={dropHandler}
                dragEndHandler={dragEndHandler}
                dragOverHandler={dragOverHandler}
                dragOn={dragOn}
                key={item.id}
              />
            );
          })}

          {addLinkButton && (
            <MyButton url={inputUrlValue} title={inputTextValue} />
          )}
        </Section>
      </Html>
    </>
  );
};

export default MyTemplate;
