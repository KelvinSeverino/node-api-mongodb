import express from "express";
import AuthorController from "../controllers/authorController.js";
import pagination from "../middlewares/pagination.js";

const app = express();
app.use(express.json());

const routes = express.Router();

routes.get("/autores", AuthorController.getAll, pagination)
routes.get("/autores/:id", AuthorController.findById)
routes.post("/autores", AuthorController.store)
routes.put("/autores/:id", AuthorController.update)
routes.delete("/autores/:id", AuthorController.delete)

export default routes;