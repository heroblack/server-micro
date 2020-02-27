const db = {
  user: [
    { id: "1", name: "Fabio" },
    { id: "2", name: "Neyla" },
    { id: "3", name: "Daniel" },
    { id: "4", name: "David" }
  ]
};

async function list(tabla) {
  return db[tabla] || [];
}
async function get(tabla, id) {
  let col = await list(tabla);
  return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  db[tabla].push(data);
  console.log(db);
  return data;
}

async function remove(tabla, id) {
  let users = await list(tabla, id);
  let index = users.findIndex(user => user.id == id);
  if (index == -1) {
    //Promise.reject(new Error("id de usuario no encontrado"));
    throw new Error("id no encontrado para eliminar.");
    return;
  }
  return db[tabla].splice(index, 1);
}

async function query(tabla, q) {
  let col = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];
  return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};
