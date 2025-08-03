import express from 'express';
import fs from "fs";

const app = express();
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
};

// endpoints

app.get("/", (req, res) => {
    res.send("Welcome to my first api with nodejs !")
});

app.get("/products", (req, res) => {
    const data = readData();
    res.json(data.products);
});

app.get("/products/:id", (req, res) => {
    let data = readData();
    let id = parseInt(req.params.id);
    let product = data.products.find((product) => product.id === id);
    res.json(product);
});

app.listen(3000, ()=> {
    console.log('Server listening on port 3000.')
});

