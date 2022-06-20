/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 20-06-2022
 * @desc Middlewares
 */

const notFound = (req, res, next) => {
  const error = new Error(`Request Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: process.env.NODE_ENV === "production" ?
      "An Error Occured" :
      error.message,
    stack: process.env.NODE_ENV === "production" ? "🙄 🙄" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};