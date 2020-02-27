function err(message, code) {
  let e = new Error(message);

  if (code) {
    console.log("el code del error es:", code);
    e.statusCode = code;
  }
  return e;
}

module.exports = err;
