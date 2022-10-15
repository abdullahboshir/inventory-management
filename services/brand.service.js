const Brand = require('../models/Brand');

exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result;
};


exports.getBrandsService = async () => {
    const brands = await Brand.find({});
    return brands;
};


exports.getBrandByIdService = async (id) => {
    const brands = await Brand.findOne({_id: id});
    return brands;
    };


    exports.updateBrandService = async (id, data) => {
        const result = await Brand.updateOne({_id: id}, data, {runValidator: true});
        return result;
    };
