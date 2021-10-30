const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());

const uri =
	"mongodb+srv://sohan0216:KdkKA24SBjPWzoV2@cluster0.zajjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((err) => {
	// const collection = client.db("test").collection("devices");
	// // perform actions on the collection object
	// const user = { name: "sohan" };
	// collection.insertOne(user).then(() => {
	// 	console.log("inserted success");
	// });
	// client.close();
});

async function run() {
	try {
		await client.connect();
		const database = client.db("packages");
		const dataCollection = database.collection("data");

		// get all data
		app.get("/data", async (req, res) => {
			const cursor = dataCollection.find({});
			const data = await cursor.toArray();
			res.send(data);
		});

		// get single data
		app.get("/data/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const dataDetails = await dataCollection.findOne(query);
			res.send(dataDetails);
		});

		console.log("db connected");
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("running db");
});

app.listen(port, () => {
	console.log("local host running", port);
});
