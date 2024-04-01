import { Text } from '@react-email/components'
import React from 'react'

interface ParentProps {
  padding?: number,
  fontSize?: number,
  children: React.ReactNode; // тип ReactNode позволяет передавать любые React-элементы в качестве дочерних
}

const Paragraph: React.FC<ParentProps> = ({ children, fontSize = 14, padding = 0 }) => {
  return (
    <Text style={{fontSize: `${fontSize}px`, padding: `${padding}px`, margin: "0px"}}>
      {children}
    </Text>
  )
};

export default Paragraph;