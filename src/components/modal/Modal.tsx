import React, { useEffect, useRef } from "react";
import style from "./modal.module.css";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal: React.FC<Props> = ({ open, setOpen, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === ref.current) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, open, setOpen]);

  const showHideClassName = open
    ? `${style.modal} ${style.displayBlock}`
    : `${style.modal} ${style.displayNone}`;
  return (
    <div className={showHideClassName} ref={ref}>
      <section className={style.modalMain}>
        <div className={style.childrenDiv}>{children}</div>
        <div className={style.buttonDiv}>
          <button
            className={`${style.closeButton} ${style.btn}`}
            type="button"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
