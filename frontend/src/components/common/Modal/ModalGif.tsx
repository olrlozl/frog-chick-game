import 'styles/components/common/Modal/modal.scss';

interface ModalGifProps {
  src: string;
  alt: string;
}

export const ModalGif = ({ src, alt }: ModalGifProps) => {
  if (!src) return null;

  return <img className="modal-gif" src={src} alt={alt} />;
};
