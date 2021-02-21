import { errorHandler } from './errorHandler';

const formatError = (err) => {
  try {
    const { extensions: { code } } = err
    if (["GRAPHQL_VALIDATION_FAILED"].includes(code)
      || err.message.startsWith('Syntax Error')
      || err.message.startsWith('Unknown operation named')) {
      errorHandler({ message: "Bad Request", status: 400 })
    }
    return err
  } catch (error) {
    return error;
  }
}

export { formatError }
