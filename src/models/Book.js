import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    publisher: { type: String },
    price: { type: Number },
    price: { type: Number },
}, { versionKey: false });

const book = mongoose.model("livros", bookSchema);

export default book;