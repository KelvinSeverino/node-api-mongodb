import express from "express";

const app = express();
app.use(express.json());

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

function searchBook(id) {
    return books.findIndex(book => {
        return book.id === Number(id);
    });
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(books);
});

app.get("/livros/:id", (req, res) => {
    const index = searchBook(req.params.id);
    res.status(200).json(books[index]);
});

app.post("/livros", (req, res) => {
    books.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!");
});

app.put("/livros/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books[index].title = req.body.title;
    res.status(200).json(books[index]);
    //res.status(201).send("Livro atualizado com sucesso!");
});

app.delete("/livros/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Livro apagado com sucesso!");
});

export default app;