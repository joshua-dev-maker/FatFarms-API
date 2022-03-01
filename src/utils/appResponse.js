const successResMsg = (res, statusCode, message) => {
  const { data, ...responseMsg } = message;
  res.status(statusCode).json({
    data,
    responseMsg,
  });
};

const errorResMsg = (res, statusCode, message) => {
  res.status(statusCode).json({
    message,
  });
};

module.exports = { successResMsg, errorResMsg };
