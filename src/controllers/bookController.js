import book from "../models/Book.js"
import { author } from "../models/Author.js";

class BookController {

    static async getAll (req, res) {       
        try {
            const listBooks = await book.find({});
            res.status(200).send(listBooks);            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na requisicao`});            
        } 
    }

    static async findById (req, res) {       
        try {
            const id = req.params.id;
            const searchedBook = await book.findById(id);
            res.status(200).send(searchedBook);            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na requisicao`});            
        } 
    }

    static async store (req, res) {
        const newBook = req.body;

        try {
            const authorFound = await author.findById(newBook.author);
            const bookComplete = { ...newBook, author:{ ... authorFound._doc } }
            const bookCreated =  await book.create(bookComplete)
            res.status(201).json({
                message: "Livro cadastrado com sucesso!", 
                book: bookCreated
            });
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao cadastrar`});
        }
    }    

    static async update (req, res) {       
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado"});            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na atualizacao`});            
        } 
    }

    static async delete (req, res) {       
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({message: "Livro removido"});            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na exclusao`});            
        } 
    }    

    static async findByPublisher (req, res) {       
        try {
            const publisher = req.query.publisher;
            const booksByPublisher = await book.find({ publisher: publisher });
            res.status(200).send(booksByPublisher);            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na requisicao`});            
        } 
    }
};

export default BookController;