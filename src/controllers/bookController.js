import book from "../models/Book.js"
import { author } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

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
            if(searchedBook !== null){
                res.status(200).send(searchedBook);  
            } else {
                next(new NotFound("ID do livro não localizado"));           
            }         
        } catch (error) {
            console.log(error);
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
            const bookResult = await book.findByIdAndUpdate(id, req.body);
            if(bookResult !== null){
                res.status(200).json({message: "Livro atualizado"});  
            } else {
                next(new NotFound("ID do livro não localizado"));           
            }           
        } catch (error) {
            next(error); //envia para o middleware de erros          
        } 
    }

    static async delete (req, res, next) {       
        try {
            const id = req.params.id;
            const bookResult = await book.findByIdAndDelete(id);
            if(bookResult !== null){
                res.status(200).json({message: "Livro removido"});  
            } else {
                next(new NotFound("ID do livro não localizado"));           
            }           
        } catch (error) {
            next(error); //envia para o middleware de erros        
        } 
    }    

    static async findByFilter (req, res, next) {       
        try {
            const search = await prepareSearch(req.query);

            if(search !== null) {
                const booksByPublisher = await book.find(search);
                res.status(200).send(booksByPublisher);  
            } else {                
                res.status(200).send([]);  
            }           
        } catch (error) {
            next(error); //envia para o middleware de erros          
        } 
    }
};

async function prepareSearch(params)
{
    const {publisher, title, minPages, maxPages, authorName} = params;

    //const regex = new RegExp(title, "i"); //1 opcao, nativa node com regex
    //if(title) search.title = regex;

    let search = {};
    if(publisher) search.publisher = publisher;
    if(title) search.title = { $regex: title, $options: "i" };

    if(minPages || maxPages) search.pages = {};
    
    //gte = Greater Than or Equal >=
    if(minPages) search.pages.$gte = minPages;        
    //lte = Less Than or Equal <=
    if(maxPages) search.pages.$lte = maxPages;

    if(authorName) {
        const authorData = await author.find({ name: authorName });
        if(authorData !== null) {
            search.author = authorData._id;
        } else {
            search = null;
        }
    }

    return search;
}

export default BookController;