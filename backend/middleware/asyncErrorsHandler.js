const catchError = (APIs) => (req, res, next) => {
  Promise.resolve(APIs(req, res, next)).catch(next);
};
export default catchError;
