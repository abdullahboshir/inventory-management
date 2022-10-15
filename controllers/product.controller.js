const Product = require("../models/Product");
const { 
    getProductsService, 
    createProductService, 
    bulkUpdateProductByIdService, 
    bulkUpdateProductService, 
    deleteProductByIdService,
    bulkDeleteProductService
} = require("../services/product.services");



exports.getProduct = async (req, res, next) => {
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

        const products = await getProductsService(filters, queries)
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

exports.createProduct = async (req, res, next) => {
    try {
        // save or create 
        const result = await createProductService(req.body);


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

exports.updateProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await bulkUpdateProductByIdService(id, req.body);
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

exports.bulkUpdateProduct = async (req, res) => {
    try {
        const result = await bulkUpdateProductService(req.body);

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


exports.deleteProductById = async (req, res) => {
    try { 
        const {id} = req.params;
        const result = await deleteProductByIdService(id);

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


exports.bulkDeleteProduct = async (req, res) => {
    try {
        const result = await bulkDeleteProductService(req.body.ids)

        res.status(200).json({
            status: 'success',
            message: 'successfully deleted the given products',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Couldn\'t delete the given products',
            error: error.message
        })
    }
};


exports.fileUpload = async (req, res) => {
    try{
        res.status(200).json(req.file)
    } catch (error) {
        
    }
}
