const { 
    createBrandService,
    getBrandsService,
    getBrandByIdService,
    updateBrandService
 } = require("../services/brand.service")


module.exports.createBrand = async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await createBrandService(req.body);
        // console.log(result)
        res.status(200).json({
            status: 'Success',
            message: 'Successfully created the brand'
        })
    } catch (error) {
    res.status(400).json({
        status: 'Fial',
        error: 'Couldn\'t create the brand',
        message: error.message
    })    
    }
};



exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService();
        res.status(200).json({
            status: 'Success',
            data: brands
        })
    } catch (error) {
    res.status(400).json({
        status: 'Fail',
        message: 'Couldn\'t get the brand',
        error: error.message
    })    
    }
};


exports.getBrandById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const brand = await getBrandByIdService(id);
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



exports.updateBrand = async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const result = await updateBrandService(id, data);
        if(!result.nModified){
            return res.status(400).json({
                status: 'Fail',
                error: 'Couidn\'t update the brand with this id'
            })
        }
        res.status(200).json({
            status: 'Success',
            message: 'Successfully update the brand'
        })
    } catch (error) {
    res.status(400).json({
        status: 'Fail',
        message: 'Couldn\'t update the brand',
        error: error.message
    })    
    }
};



