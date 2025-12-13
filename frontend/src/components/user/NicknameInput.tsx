import { KeyboardEventHandler } from 'react';
import 'styles/components/user/nickname-input.scss';
import { ChangeEvent, SetState } from 'types/common';

const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 6;

interface NicknameInputProps {
  text: string;
  nickname: string;
  setNickname: SetState<string>;
  setErrorMessage: SetState<string>;
  onEnter: () => void;
}

const NicknameInput = ({
  text,
  nickname,
  setNickname,
  setErrorMessage,
  onEnter,
}: NicknameInputProps) => {
  const handleChangeNickname = (e: ChangeEvent) => {
    setErrorMessage('');

    setNickname(e.target.value);
  };

  const executeOnEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') onEnter();
  };

  return (
    <div className="nickname-input">
      <input
        type="text"
        placeholder={text}
        value={nickname}
        onChange={(e) => handleChangeNickname(e)}
        onKeyDown={executeOnEnter}
        pattern="^[가-힣a-zA-Z]{2,6}$"
        minLength={NICKNAME_MIN_LENGTH}
        maxLength={NICKNAME_MAX_LENGTH}
      />

      <div className="clear-btn">
        <button
          type="button"
          className={nickname ? '' : 'hidden'}
          onClick={() => {
            setNickname('');
            setErrorMessage('');
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default NicknameInput;
