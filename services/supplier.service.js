const Supplier = require("../models/Supplier");





exports.createSupplierService = async (data) => {
    const result = await Supplier.create(data);
    return result;
};

exports.getSupplierService = async () => {
    const result = await Supplier.find({});
    return result;
};

exports.getStupplierByIdService = async (StoreId) => {
    const result = await Supplier.findOne({_id: StoreId});
    return result;
};

exports.updateSupplierService = async (storeId, data) => {
    const result = await Supplier.updateOne({_id: storeId}, data, {runValidators: true});
    return result;
};