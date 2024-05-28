import { author } from "../models/Author.js"

class AuthorController {

    static async getAll (req, res, next) {       
        try {
            const listAuthors = await author.find({});
            res.status(200).send(listAuthors);            
        } catch (error) {
            next(error); //envia para o middleware de erros       
        } 
    }

    static async findById (req, res, next) {       
        try {
            const id = req.params.id;
            const searchedAuthor = await author.findById(id);
            
            if(searchedAuthor !== null){
                res.status(200).send(searchedAuthor);      
            } else {
                res.status(404).send({message: "ID do autor não localizado"});          
            }      
        } catch (error) {      
            next(error); //envia para o middleware de erros
        } 
    }

    static async store (req, res, next) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Autor cadastrado com sucesso!", 
                author: newAuthor
            });
        } catch (error) {
            next(error); //envia para o middleware de erros
        }
    }    

    static async update (req, res, next) {       
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualizado"});            
        } catch (error) {
            next(error); //envia para o middleware de erros       
        } 
    }

    static async delete (req, res, next) {       
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({message: "Autor removido"});            
        } catch (error) {
            next(error); //envia para o middleware de erros        
        } 
    }    
};

export default AuthorController;