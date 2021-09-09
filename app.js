require("dotenv").config();
let express = require("express");
let app = express();

let sequelize = require("./db");

let post = require("./controller/postcontroller");
let user = require("./controller/usercontroller");

sequelize.sync();
app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", user);

// app.use(require("./middleware/validate-session"));
app.use("/post", post);

app.listen(3001, function () {
  console.log("Listening on port 3001");
});
