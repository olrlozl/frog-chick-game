import 'styles/components/user/nickname-input.scss';

interface NicknameInputProps {
  text: '한글, 영어 2~6자' | '닉네임을 입력해주세요.'
}

const NicknameInput = ({ text }: NicknameInputProps) => {
  return (
    <input
      className='nickname-input'
      type="text"
      placeholder={text}
      pattern="^[가-힣a-zA-Z]{2,6}$"
      minLength={2}
      maxLength={6}
    />
  );
};

export default NicknameInput;
