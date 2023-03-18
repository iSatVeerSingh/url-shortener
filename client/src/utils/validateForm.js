const validateForm = (formdata, type) => {
  const formErrors = {};

  if (type !== 'login') {
    if (!formdata.name || formdata.name.length < 1) {
      formErrors.name = 'Name is required';
    }
  }

  if (
    !formdata.email ||
    !/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(formdata.email)
  ) {
    formErrors.email = 'Please provide valid email';
  }

  if (type !== 'shortlink') {
    if (!formdata.password || formdata.password.length < 8) {
      formErrors.password = 'Password must be 8 characters long';
    }
  }

  if (Object.keys(formErrors).length !== 0) {
    return formErrors;
  }
  return null;
};
export default validateForm;
