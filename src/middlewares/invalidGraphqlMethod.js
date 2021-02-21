export default (req, res, next) => {
    const { method, url } = req;
    if (url === '/graphql' && !['POST', 'GET', 'OPTIONS'].includes(method)) {
        return res.status(405).send({
            errors: [{
                message: `${method} is not supported for route ${url}`,
                extensions: { code: 'BAD REQUEST' },
            }],
        });
    }
    return next();
}
