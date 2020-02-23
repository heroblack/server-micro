const express = require("express");
const config = require("../config");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("../network/routes");
//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routers
router(app);

app.listen(config.api.port, () => {
  console.log(`server listen http://localhost:${config.api.port}`);
});
