import React from 'react'
import '../style/Modal.css'

interface ModalProps {
  setIframeShow :(n: boolean) => void,
  html: string
}

const Modal: React.FC<ModalProps> = ({setIframeShow, html})  =>{
  return (
    <div className="modal">
    <div className="modal-content">
      <span
        className="close"
        onClick={() => {
          setIframeShow(false);
        }}
      >
        &times;
      </span>
      <iframe
        style={{ border: "none" }}
        srcDoc={html}
        width="100%"
        height="500"
        title="Встраиваемая страница"
      ></iframe>
    </div>
  </div>
  )
}

export default Modal;
