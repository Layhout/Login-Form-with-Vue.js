const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("tiny"));

mongoose.connect("mongodb+srv://Tester:12345@testdb.hnp6o.mongodb.net/myTest?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.log(err.message);
    });

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    gender: String,
    dob: String,
}, { timestamps: true });
const User = mongoose.model("users", UserSchema);

// Data Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To allow other domain access to this port
app.use(cors());

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     console.log(req.body);
//     next();
// });

app.get("/users", async (req, res) => {
    await User.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err.message);
        })
});

app.post("/save", async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const { password, ...found } = user.toObject();
            console.log("user is already exists", found);
            res.status(409).json(null);
            return;
        }
        newUser.save().then(data => {
            const { password, ...saved } = data.toObject();
            console.log(68, saved);
            res.status(201).json({ msg: "Register Successful." })
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err)
    }
});

app.post("/check", async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email, password: req.body.password });
        if (foundUser) {
            const { password, ...found } = foundUser.toObject()
            console.log("User Found.", found);
            res.status(200).json(found);
            return;
        }
        res.status(401).json(null);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("ERROR");
    }
});

app.post("/get-one-user", async (req, res) => {
    try {
        const foundUser = await User.findById(req.body.id);
        if (foundUser) {
            const { password, ...found } = foundUser.toObject()
            res.status(200).json(found);
            return;
        }
        res.status(401).json(null);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("ERROR");
    }
});

app.patch("/update", async (req, res) => {
    try {
        console.log(req.body);
        const newData = { firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, email: req.body.email, gender: req.body.gender }
        await User.findByIdAndUpdate({ _id: req.body.id }, newData, { useFindAndModify: false });
        const updateUser = await User.findById({ _id: req.body.id });
        if (updateUser) {
            console.log("update!!!!!", updateUser);
            res.status(200).json(updateUser);
            return;
        }
        res.status(400).json(null);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("ERROR");
    }
});

app.listen(1000);
