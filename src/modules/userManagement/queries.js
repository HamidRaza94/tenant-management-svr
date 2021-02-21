const queries = {
  getTestQuery: async (_, args) => {
    try {
      console.log('args =>', args);
      return 'Success';
    } catch (err) {
      return 'Failure';
    }
  },
}

export default queries;
