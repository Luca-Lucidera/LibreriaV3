export const isValidUsername = (username: string | null): boolean => {
  if(username === null) return false;
  return username.length >= 3 && username.length <= 255;
};

export const isValidPassword = (password: string | null): boolean => {
  if(password === null) return false;
  return password.length >= 8 && password.length <= 255;
};
