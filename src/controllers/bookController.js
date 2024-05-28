import book from "../models/Book.js"
import { author } from "../models/Author.js";

class BookController {

    static async getAll (req, res, next) {       
        try {
            const listBooks = await book.find({});
            res.status(200).send(listBooks);            
        } catch (error) {
            next(error); //envia para o middleware de erros    
        } 
    }

    static async findById (req, res, next) {       
        try {
            const id = req.params.id;
            const searchedBook = await book.findById(id);
            res.status(200).send(searchedBook);            
        } catch (error) {
            next(error); //envia para o middleware de erros        
        } 
    }

    static async store (req, res, next) {
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
            next(error); //envia para o middleware de erros
        }
    }    

    static async update (req, res, next) {       
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado"});            
        } catch (error) {
            next(error); //envia para o middleware de erros          
        } 
    }

    static async delete (req, res, next) {       
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({message: "Livro removido"});            
        } catch (error) {
            next(error); //envia para o middleware de erros        
        } 
    }    

    static async findByPublisher (req, res, next) {       
        try {
            const publisher = req.query.publisher;
            const booksByPublisher = await book.find({ publisher: publisher });
            res.status(200).send(booksByPublisher);            
        } catch (error) {
            next(error); //envia para o middleware de erros          
        } 
    }
};

export default BookController;