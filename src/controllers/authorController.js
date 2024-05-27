import { author } from "../models/Author.js"

class AuthorController {

    static async getAll (req, res) {       
        try {
            const listAuthors = await author.find({});
            res.status(200).send(listAuthors);            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na requisicao`});            
        } 
    }

    static async findById (req, res) {       
        try {
            const id = req.params.id;
            const searchedAuthor = await author.findById(id);
            res.status(200).send(searchedAuthor);            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na requisicao`});            
        } 
    }

    static async store (req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Autor cadastrado com sucesso!", 
                author: newAuthor
            });
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao cadastrar`});
        }
    }    

    static async update (req, res) {       
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualizado"});            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na atualizacao`});            
        } 
    }

    static async delete (req, res) {       
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({message: "Autor removido"});            
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha na exclusao`});            
        } 
    }    
};

export default AuthorController;