const notHasName = {
  email: "paulaalves.pma@gmail.com",
};
const notHasEmail = {
  name: 'Paula Magalhães',
};

const notHasAllRequiredFields = {
  password: "123456",
  genre: 'F',
}

const hasAllRequiredFields = {
  name: 'Paula Magalhães',
  email: "paulaalves.pma@gmail.com",
}

const correctFemaleDataEntity = {
  name: 'Paula Magalhães',
  email: "paulaalves.pma@gmail.com",
  password: "123456",
  genre: 'F',
  // created: new Date(),
  active: 1
};

const inCorrectFemaleDataEntity = {
  name: 'Paula Magalhães',
  password: "123456",
  genre: 'F',
  // created: new Date(),
  active: 1
};

const correctMaleDataEntity = {
  name: 'Lucas Henrique',
  email: "luketevl@gmail.com",
  password: "123456",
  genre: 'M',
  // created: new Date(),
  active: 1
};

const inCorrectMaleDataEntity = {
  name: 'Lucas Henrique',
  password: "123456",
  genre: 'M',
  // created: new Date(),
  active: 1
};

export {
  correctFemaleDataEntity,
  inCorrectFemaleDataEntity,
  correctMaleDataEntity,
  inCorrectMaleDataEntity
};
