import {
    UserInputError,
    AuthenticationError,
    ForbiddenError,
    ApolloError,
} from 'apollo-server';


export const statusCode = {
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHENTICATED: 401,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
}

export const errorHandler = (err) => {
    let message;
    let status;
    let error
    const strErr = JSON.parse(JSON.stringify(err));
    const parsedErr = strErr && strErr.extensions && strErr.extensions.response
        && strErr.extensions.response.body;
    if (parsedErr !== undefined) {
        message = parsedErr.message || 'INTERNAL SERVER ERROR';
        status = parsedErr.status || 500;
        error = parsedErr.error || err.error;
    } else {
        const { message: msg, status: codeStatus, error: errorMessage } = strErr;
        message = msg || 'INTERNAL SERVER ERROR';
        status = codeStatus || 500;
        error = errorMessage;
    }
    switch (status) {
        case statusCode.BAD_REQUEST: throw new UserInputError(message, { error });
        case statusCode.NOT_FOUND: throw new UserInputError(message, { error });
        case statusCode.UNAUTHENTICATED: throw new AuthenticationError(message, { error });
        case statusCode.FORBIDDEN: throw new ForbiddenError(message, { error });
        case statusCode.SERVER_ERROR: throw new ApolloError(message, { error });
        default: throw new ApolloError(message, { error });
    }
}
