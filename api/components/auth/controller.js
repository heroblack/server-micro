const auth = require("../../../auth");
const TABLA = "auth";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../../store/dummy");
  }

  async function login(username, password) {
    console.log("username:", username);
    const data = await store.query(TABLA, { username: username });
    if (data.password !== password) {
      throw new Error("informacion invalida!!");
      return;
    }
    return auth.sign(data);
  }

  function upsert(data) {
    const authData = {
      id: data.id,
      username: data.username ? data.username : "",
      password: data.password ? data.password : ""
    };

    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login
  };
};
