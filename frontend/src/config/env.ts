const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  }
  return value;
};

export const ENV = {
  API_URL_DEV: getEnvVar('REACT_APP_API_URL_DEV'),
  REDIRECT_URI: getEnvVar('REACT_APP_REDIRECT_URI'),
  REST_API_KEY: getEnvVar('REACT_APP_REST_API_KEY'),
};
