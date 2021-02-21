export default ({ headers }, res, next) => {
  if (headers && headers['content-type'] && headers['content-type'] !== 'application/json') {
    return res.status(400).send({
      errors: [{
        message: 'Invalid content type',
        extensions: { code: 'BAD REQUEST' },
      }],
    });
  }

  return next();
}
