// Verify keys as some
const haveRequiredFields = (required, object) => {
  const requiredKeys = Object.keys(required);
  const objectKeys   = Object.keys(object);
  return requiredKeys.every(key => objectKeys.includes(key));
};

export {
  haveRequiredFields,
};
