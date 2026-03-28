import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ERROR_MESSAGES, ErrorMessageKeys } from 'constants/errorMessages';

interface ErrorState {
  errorMessage: string;
  setErrorMessage: (errorKey: ErrorMessageKeys, errorType: string) => void;
  clearErrorMessage: () => void;
}

export const useErrorStore = create<ErrorState>()(
  devtools(
    (set) => ({
      errorMessage: '',
      setErrorMessage: (errorKey, errorType) =>
        set({
          errorMessage:
            ERROR_MESSAGES[errorKey][errorType] ??
            ERROR_MESSAGES.COMMON.UNKNOWN_ERROR,
        }),
      clearErrorMessage: () => set({ errorMessage: '' }),
    }),
    { name: 'ErrorStore' }
  )
);
