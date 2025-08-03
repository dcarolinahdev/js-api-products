import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

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

app.post("/products/", (req, res) => {
    let data = readData();
    let body = req.body;
    let newProduct = {
        id: data.products.length + 1,
        ...body,
    };
    data.products.push(newProduct);
    writeData(data);
    res.json(newProduct);
});

app.listen(3000, ()=> {
    console.log('Server listening on port 3000.')
});

