const queries = {
  getTestQuery: async (_, args) => {
    try {
      // eslint-disable-next-line no-console
      console.log('args =>', args);
      return 'Success';
    } catch (err) {
      return 'Failure';
    }
  },
}

export default queries;
