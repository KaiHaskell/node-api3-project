module.exports = () => (req, res, next) => {
  console.log(
    `${req.method} request to ${req.originalUrl} at ${new Date().toUTCString()}`
  );
  next();
};
