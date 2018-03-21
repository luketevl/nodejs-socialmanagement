const REGEX_EMAIL = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+';
const REGEX_ALFANUM_UNDERLINE = '^[a-z0-9_]{3,16}$';

const _applyTestRegex = (regex, value) => {
  const rg = new RegExp(regex);
  return rg.test(value);
}

const minMax = (value, min= 1, max='') => _applyTestRegex(`^.{${min},${max}}$`, value);
const email = (value) => _applyTestRegex(REGEX_EMAIL, value);
const alphanumUnderline = (value) => _applyTestRegex(REGEX_ALFANUM_UNDERLINE, value);

export default {
  minMax,
  email,
  alphanumUnderline,
}
