import express from "express";
import connectDatabase from "./config/dbConnect.js";
import book from "./models/Book.js"

const connection = await connectDatabase();
connection.on("error", (error) => {
    console.error("Erro de Conexão com MongoDB:", error);
})
connection.once("open", () => {
    console.log("Conexão com MongoDB feita com sucesso!")
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", async (req, res) => {
    const listBooks = await book.find({});
    res.status(200).send(listBooks);
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
