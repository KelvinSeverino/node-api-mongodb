import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import routeNotFoundHandler from "./middlewares/routeNotFoundHandler.js";

const connection = await connectDatabase();
connection.on("error", (error) => {
    console.error("Erro de Conexão com MongoDB:", error);
})
connection.once("open", () => {
    console.log("Conexão com MongoDB feita com sucesso!")
});

const app = express();
routes(app);

app.use(routeNotFoundHandler)

//Midleware de erro
app.use(errorHandler)

export default app;
