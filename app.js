require("dotenv").config();
let express = require("express");
let app = express();

let sequelize = require("./db");

let user = require("./controller/usercontroller");

sequelize.sync();

app.use(express.json());

app.use("/user", user);

app.use("/test", function (req, res) {
	res.send("This is a test endpoint for setup.");
});

app.listen(3001, function () {
	console.log("Listening on port 3001");
});
