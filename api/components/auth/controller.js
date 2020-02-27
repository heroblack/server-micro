const auth = require("../../../auth");
const bcrypt = require("bcrypt");
const TABLA = "auth";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    const equals = await bcrypt.compare(password, data.password);
    if (!equals) {
      throw new Error("informacion invalida!!");
      return;
    }
    return auth.sign(data);
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
      username: data.username ? data.username : "",
      password: data.password ? await bcrypt.hash(data.password, 5) : ""
    };

    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login
  };
};
