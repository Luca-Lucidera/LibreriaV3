export const isValidUsername = (username: FormDataEntryValue | null): boolean => {
  return (
    typeof username === "string" &&
    username.length >= 3 &&
    username.length <= 31 &&
    /^[a-z0-9_-]+$/.test(username)
  );
};

export const isValidPassword = (password: FormDataEntryValue | null): boolean => {
  return (
    typeof password === "string" &&
    password.length >= 6 &&
    password.length <= 255
  );
};

export const isValidDateOfBirth = (dateOfBirth: FormDataEntryValue | null): boolean => {
  return (
    typeof dateOfBirth === "string" &&
    dateOfBirth.length >= 6 &&
    dateOfBirth.length <= 255
  );
}
