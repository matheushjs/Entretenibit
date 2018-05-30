function test(req, res, next) {
  return res.status(200).json({
    message: "Hello World"
  });
}

module.exports = {
  test
};
