const Category = require("../models/Category");




exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
};


exports.getcategoryService = async () => {
    const category = await Category.find({});
    return category;
};



exports.getCategoryByIdService = async (id) => {
    const category = await Category.findOne({_id: id});
    return category;
    };


    exports.updateCategoryService = async (id, data) => {
        const result = await Category.updateOne({_id: id}, data, {runValidator: true});
        return result;
    };

