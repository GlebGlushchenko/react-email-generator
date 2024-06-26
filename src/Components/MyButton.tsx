import { Button, Column, Row } from "@react-email/components";
import React from "react";

interface ButtonProps {
  title: string
  url: string
}

const MyButton: React.FC<ButtonProps> = ({title, url}) => {
  

  return (
    <Row style={{ paddingTop: "20px" }}>
      <Column style={{ textAlign: "center" }}>
        <Button
          href={url}
          style={{
            textTransform: "uppercase",
            background: "#5f61e7",
            color: "white",
            fontSize: "13px",
            padding: "10px 25px",
            borderRadius: "3px",
            textDecoration: "none",
            margin: "0",
            lineHeight: "120%",
          }}
        >
          {title}
        </Button>
      </Column>
    </Row>
  );
};

export default MyButton;
