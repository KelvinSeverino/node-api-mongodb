import express from "express";

const app = express();

const books = [
    {
        id: 1,
        title: "Uncharted: The Four Labyrinth"
    },
    {
        id: 2,
        title: "God of War"
    }
]

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(books);
});

export default app;