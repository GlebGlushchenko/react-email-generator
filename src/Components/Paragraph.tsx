import { Text } from "@react-email/components";
import React from "react";

interface ParentProps {
  padding?: number;
  fontSize?: number;
  children: React.ReactNode;
  isPositionCenter: boolean
}

const Paragraph: React.FC<ParentProps> = ({
  children,
  fontSize = 14,
  padding = 0,
  isPositionCenter
}) => {
  return (
    <Text
    
      style={{
        fontSize: `${fontSize}px`,
        padding: `${padding}px`,
        margin: "0px",
        textAlign: `${isPositionCenter ? 'center' : 'left'}`
      }}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
