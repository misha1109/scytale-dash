export const errorHandler = (err, req, res, next) => {
  const {status, message} = err;
  if (status) {
    res.status(status).send(message);
  } else {
    res.send(message);
  }
};
