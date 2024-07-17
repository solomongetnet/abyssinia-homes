import { ReactNode, useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  withClose?: boolean;
  modalClassName?: string;
  overlayClassName?: string;
  containerClassName?: string;
}

const Modal: React.FC<IProps> = ({
  isOpen,
  onClose,
  children,
  withClose = false,
  modalClassName,
  overlayClassName,
  containerClassName
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return show ? (
    <div
      className={twMerge(`fixed inset-0 z-50 ${
        isOpen ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 ${containerClassName}`)}
    >
      <div
        className={twMerge(
          `fixed inset-0 bg-white dark:bg-black ${
            isOpen ? "opacity-50" : "opacity-0"
          } transition-opacity duration-300 ${overlayClassName}`
        )}
        onClick={handleOverlayClick}
      ></div>
      <div
        ref={modalRef}
        className={twMerge(
          `bg-white/50 dark:bg-black/50 p-6 rounded-lg shadow-lg z-10 transform ${
            isOpen ? "scale-100" : "scale-90"
          } transition-transform duration-300 ${modalClassName}`
        )}
      >
        {children}
        {withClose && (
          <button
            onClick={onClose}
            className={twMerge(`mt-4 bg-red-500 text-white px-4 py-2 rounded`)}
          >
            Close
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
