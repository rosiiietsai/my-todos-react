import ReactDOM from 'react-dom';
import { useEffect } from 'react';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKeyClose = e => e.code === 'Escape' && onClose();
    document.body.addEventListener('keydown', handleKeyClose);
    return () => document.body.removeEventListener('keydown', handleKeyClose);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">{children}</div>
    </div>,
    document.body
  );
}
