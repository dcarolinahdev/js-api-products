import express from 'express';
import fs from "fs";

const app = express();
const readData = () => {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
};

readData();

app.get("/", (req, res) => {
    res.send("Welcome to my first api with nodejs !")
});

app.listen(3000, ()=> {
    console.log('Server listening on port 3000.')
});

