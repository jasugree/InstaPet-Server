let express = require("express");
let app = express();

app.use("/test", function (req, res) {
	res.send("This is a test endpoint for setup.");
});

app.listen(3001, function () {
	console.log("Listening on port 3001");
});
