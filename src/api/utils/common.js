// Verify keys as some
const haveRequiredFields = (required, object) => {
  const requiredKeys = Object.keys(required);
  const objectKeys   = Object.keys(object);
  return requiredKeys.every(key => objectKeys.includes(key));
};

const objectToQuery = data =>{
  let result = [];
  for(const key in data){
    result.push(`${key}=${data[key]}`);
  }
  return result.join('&');
}

export {
  haveRequiredFields,
  objectToQuery
};
