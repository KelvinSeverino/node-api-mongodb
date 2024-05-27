//import http from 'http';
import app from "./src/app.js";

const PORT = 3000;

// const routes = {
//     "/": "Curso de Express API",
//     "/livros": "Rota Livros",
//     "/autores": "Rota Autores"
// };

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.end(routes[req.url]);
// });

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}!`)
});