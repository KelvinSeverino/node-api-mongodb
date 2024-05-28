import mongoose from "mongoose";

function errorHandler (error, req, res, next) {       
    if(error instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});      
    } else if (error instanceof mongoose.Error.ValidationError) {
        const errorsMessage = Object.values(error.errors)
                                    .map(error => error.message)
                                    .join("; ");

        res.status(400).send({message: `Os seguintes erros foram encontrados: ${errorsMessage}`})
    } else {
        res.status(500).send({message: `${error.message} - Falha na requisicao`});  
    };
}

export default errorHandler;