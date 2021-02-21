import httpStatus from 'http-status';

const errorHandlerRoute = (stack = false) => (err, req, res, next) => {
  res.status(err.status).json({
    data: err.data || [],
    message: err.isPublic ? err.message : (httpStatus)[err.status],
    stack: stack ? err.stack : '',
    status: 'error',
  });
};

export default errorHandlerRoute;
