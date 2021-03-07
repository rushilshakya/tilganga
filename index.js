const app = require("express")();
const http = require("http").Server(app);
const cors = require("cors");
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});
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
