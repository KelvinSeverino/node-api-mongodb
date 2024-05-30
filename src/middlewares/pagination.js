import IncorrectRequest from "../errors/IncorrectRequest.js";

async function pagination(req, res, next) {    
    try {
        let { 
            limit = 5, 
            page = 1, 
            //orderField = '_id', 
            //order = -1 
            ordernation = "_id:-1"
        } = req.query;
    
        let [orderField, order] = ordernation.split(":");
    
        limit = parseInt(limit);
        page = parseInt(page);
        order = parseInt(order);

        const result = req.result;

        if(limit > 0 && page > 0){
            const paginationResult = await result.find()
                                        .sort({ [orderField]: order }) //-1 = desc, 1 = asc
                                        .skip((page - 1) * limit)
                                        .limit(limit);
            res.status(200).send(paginationResult); 
        } else {
            next(new IncorrectRequest());
        }
    } catch (error) {
        next(error);
    }
}

export default pagination;