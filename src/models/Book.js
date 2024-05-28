import mongoose from "mongoose";
import { authorSchema } from "./Author.js"

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { 
        type: String, 
        required: [true, "O nome do livro é obrigatório"],
    },
    publisher: { 
        type: String,
        enum: {
            values: ["Casa do código", "Alura"],
            message: "A editora {VALUE} fornecida não é valida"
        }
    },
    price: { type: Number },
    pages: { 
        type: Number,
        // min: [10, 'O Numero deve paginas estar entre 10 e 5000. Valor fornecido: {VALUE}'],
        // max: [5000, 'O Numero deve paginas estar entre 10 e 5000. Valor fornecido: {VALUE}'],
        validate: {
            validator: (value) => {
                return value >= 10 && value <= 5000;
            },
            message: "O Numero deve paginas estar entre 10 e 5000. Valor fornecido: {VALUE}"
        }
    },
    author: authorSchema
}, { versionKey: false });

const book = mongoose.model("livros", bookSchema);

export default book;