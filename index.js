const app = require("express")();
const http = require("http").Server(app);
//const io = require("socket.io")(http);
const io = require("socket.io")(http, {
	cors: {
		origins: ["http://localhost:3000", "http://localhost","http://www.blindsighttrainer.com/trainer_alpha.html?id=Sujay2"],
		methods: ["GET", "POST"],
	},
});
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/focusing", (req, res) => {
	res.send("you are focusing");
	io.emit("chat message", "focusing");
});

app.get("/notfocusing", (req, res) => {
	res.send("you are not focusing");
	io.emit("chat message", "not focusing");
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
