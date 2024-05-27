import express from "express";
import BookController from "../controllers/bookController.js";

const app = express();
app.use(express.json());

const routes = express.Router();

routes.get("/livros", BookController.getAll)
routes.get("/livros/busca", BookController.findByPublisher)
routes.get("/livros/:id", BookController.findById)
routes.post("/livros", BookController.store)
routes.put("/livros/:id", BookController.update)
routes.delete("/livros/:id", BookController.delete)

export default routes;