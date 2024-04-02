export const IsOver18 = (dateOfBirth: string): boolean => {
  const date = new Date(dateOfBirth);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970) >= 18;
};
