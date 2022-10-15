const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Stock = require('../models/Stock');

exports.getStockService = async (filters, queries) => {
   const stock = await Stock.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy)
   const total = await Stock.countDocuments(filters);
   const page = Math.ceil(total / queries.limit)
   return { total, page, stock }
};


exports.createStockService = async (data) => {
   const product = await Stock.create(data);
   return product;
};


exports.updateStockService = async (productId, data) => {
   const result = Stock.updateOne(
      { _id: productId },
      { $inc: data },
      { runValidators: true }
   );
   return result;
};

exports.bulkUpdateStockByIdService = async (data) => {
   const products = [];
   data.ids.forEach(product => {
      products.push(Stock.updateOne({ _id: product.id }, product.data))
   });
   const result = await Promise.all(products);
   console.log(result)
   return result;
};

exports.deleteStockByIdService = async (id) => {
   const result = await Stock.deleteOne({ _id: id })
   return result;
};


exports.getStockByIdService = async (id) => {
   // const result = await Stock.findOne({_id: id}).populate('supplier');
   const stock = await Stock.aggregate([
      {$match: {_id: ObjectId(id)}},
      {
         $lookup: {
            from: 'brands',
            localField: 'brand.name',
            foreignField: 'name',
            as: 'brandDetails'
         }
      }
   ])
   return stock;
};

