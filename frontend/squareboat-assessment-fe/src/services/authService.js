import matcher from "../utils/regExpMatchers";

const { emailMatcher, nameMatcher } = matcher;

export const validateSignUpDetails = (name, email, password) => {
  const userName = name.firstName + " " + name.lastName;
  const isNameValid = userName.match(nameMatcher);
  const isEmailValid = email.match(emailMatcher);

  const isPasswordValid = password.length > 7;

  return isEmailValid && isNameValid && isPasswordValid ? "valid" : "invalid";
};
