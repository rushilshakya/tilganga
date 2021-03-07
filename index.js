const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());

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

io.on("connection", socket => {
	socket.on("chat message", msg => {
		io.emit("chat message", msg);
	});
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
