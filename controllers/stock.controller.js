const { 
    getStockService, 
    createStockService, 
    updateStockService, 
    bulkUpdateStockByIdService, 
    deleteStockByIdService,
    getStockByIdService
} = require("../services/stock.services");




exports.getStock = async (req, res, next) => {
    try {
        // const products = await getproductsService();
        let filters = {...req.query};
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);

        //gt, lt, gte, lte
        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`);
        filters = JSON.parse(filterString)

        const queries = {};

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        };

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if(req.query.page){
            const {page=1, limit=10} = req.query;
            const skip = (page -1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const products = await getStockService(filters, queries)
        res.status(200).json({
            status: 'success',
            data: products
        });

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: "can't get the data",
            error: error.message
        })
    }
};

exports.createStock = async (req, res, next) => {
    try {
        // save or create 
        const result = await createStockService(req.body);


        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Data is not inserted',
            error: error.message
        })
    }
};

exports.updateStockById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await updateStockService(id, req.body);
        console.log(result)

        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Couldn\'t update the product',
            error: error.message
        })
    }
};

exports.bulkUpdateStock = async (req, res) => {
    try {
        const result = await bulkUpdateStockByIdService(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Couldn\'t update the product',
            error: error.message
        })
    }
};


exports.deleteStockById = async (req, res) => {
    try { 
        const {id} = req.params;
        const result = await deleteStockByIdService(id);

        if(result.deletedCount){
            res.status(200).json({
                status: 'success',
                message: 'successfully deleted the product',
                data: result
            })
        }
        else{
            res.status(400).json({
                status: 'Failed',
                message: 'Couldn\'t delete',
                data: result
            })    
        }

        
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Couldn\'t delete the product',
            error: error.message
        })
    }
};


exports.getStockById = async (req, res) => {
    try {
        const {id} = req.params;
        const stock = await getStockByIdService(id);
    
        if(!stock){
           return res.status(400).json({
                status: 'fail',
                message: 'Can\'t get the stock with this id',
                error: error.message
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'successfully get the stock',
            data: stock
        })
    } catch (error) {
         res.status(400).json({
            status: false,
            message: 'Can\'t get the stock',
            error: error.message
        })
    }
}