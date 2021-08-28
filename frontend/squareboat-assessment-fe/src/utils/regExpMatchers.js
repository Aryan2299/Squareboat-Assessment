export const matcher = {
  emailMatcher: new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g),
  nameMatcher: new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g),
};

export default matcher;
