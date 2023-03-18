export const validateSignup = (userdata) => {
  const userErrors = {};

  if (!userdata.name || userdata.name.length === 0) {
    userErrors.name = 'Please provide your name';
  }
  if (
    !userdata.email ||
    !/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(userdata.email)
  ) {
    userErrors.email = 'Please provide valid email';
  }
  if (!userdata.password || userdata.password.length < 8) {
    userErrors.password = 'Password length must be 8 characters';
  }

  if (Object.keys(userErrors).length !== 0) {
    return userErrors;
  }
  return null;
};

export const validateLogin = (userdata) => {
  const userErrors = {};

  if (
    !userdata.email ||
    !/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(userdata.email)
  ) {
    userErrors.email = 'Please provide valid email';
  }
  if (!userdata.password || userdata.password.length < 8) {
    userErrors.password = 'Password length must be 8 characters';
  }

  if (Object.keys(userErrors).length !== 0) {
    return userErrors;
  }
  return null;
};

export const validateClickData = (userdata) => {
  const userErrors = {};

  if (!userdata.name || userdata.name.length === 0) {
    userErrors.name = 'Please provide your name';
  }
  if (
    !userdata.email ||
    !/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(userdata.email)
  ) {
    userErrors.email = 'Please provide valid email';
  }

  if (Object.keys(userErrors).length !== 0) {
    return userErrors;
  }
  return null;
};
