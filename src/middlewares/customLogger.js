function customLogger(req, res, next) {
  const method = req.method;
  const httpVersion = req.httpVersion;
  const reqUrl = req.url;
  console.log(`v${httpVersion} ${method} ${reqUrl}`);
  next();
}

module.exports = { customLogger };
