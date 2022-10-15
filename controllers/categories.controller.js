const {
    createCategoryService,
    getcategoryService,
    updateCategoryService,
    getCategoryByIdService
} = require("../services/categories.services");



exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully created the category',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: 'Couldn\'t create the category',
            message: error.message
        })
    }
};


exports.getCategory = async (req, res) => {
    try {
        const result = await getcategoryService()
        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the category',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: 'Couldn\'t found the category',
            message: error.message
        })
    }
};



exports.getCategoryById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const brand = await getCategoryByIdService(id);
        if(!brand){
            return res.status(400).json({
                status: 'Fail',
                error: 'Couidn\'t find a brand with this id'
            })
        }
        res.status(200).json({
            status: 'Success',
            data: brand
        })
    } catch (error) {
    res.status(400).json({
        status: 'Fail',
        message: 'Couldn\'t get the brand',
        error: error.message
    })    
    }
};



exports.updateCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const result = await updateCategoryService(id, data);
        console.log(result)
        if(!result.modifiedCount){
            return res.status(400).json({
                status: 'Fail',
                error: 'Couidn\'t update the brand with this id'
            })
        }
        res.status(200).json({
            status: 'Success',
            message: 'Successfully update the category',
            data: result
        })
    } catch (error) {
    res.status(400).json({
        status: 'Fail',
        message: 'Couldn\'t update the brand',
        error: error.message
    })    
    }
};