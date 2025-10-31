import 'styles/components/common/Modal/modal.scss';

export const ModalMessage = ({
  message,
  messageFontSize = 'font-md',
}: {
  message: string;
  messageFontSize?: string;
}) => {
  return <div className={`message ${messageFontSize}`}>{message}</div>;
};
