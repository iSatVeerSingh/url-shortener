export const getSuccessResponse = (data) => ({
  success: true,
  error: false,
  data,
});

export const getErrorResponse = (err) => {
  const response = {
    success: false,
    error: true,
  };

  if (typeof err !== 'string') {
    if (err.code === 11000) {
      response.data = `User with that ${
        Object.keys(err.keyValue)[0]
      } already exists`;
      return response;
    }
    response.data = 'Internal server error';
    return response;
  }
  response.data = err;
  return response;
};
