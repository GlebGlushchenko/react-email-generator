import React from "react";
import "../style/Modal.css";
import { useModalStore } from "../state/modal.state";

interface ModalProps {
  html: string;
}

const Modal: React.FC<ModalProps> = ({ html }) => {
  const iframeShow = useModalStore((state) => state.iframeShow);
  const setIframeShow = useModalStore((state) => state.setIframeShow);

  React.useEffect(() => {
    if (iframeShow) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [iframeShow]);
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
  );
};

export default Modal;
