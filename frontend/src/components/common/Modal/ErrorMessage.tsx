import 'styles/components/common/Modal/error-message.scss';

export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="error-message">{errorMessage}</div>;
};
