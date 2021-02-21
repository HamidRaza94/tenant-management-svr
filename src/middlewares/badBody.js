export default (err, req, res, next) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({
            errors: [{
                message: 'Bad JSON Body',
                extensions: { code: 'BAD REQUEST' },
            }],
        });
    }
    return next();
};
