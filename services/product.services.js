const Product = require('../models/Product');
const Brand = require('../models/Brand');

exports.getProductsService = async (filters, queries) => {
   // const products = await Product.find({$or: [{_id:  '631f36e22f5bfbf12a54442f'},{ name: 'Battery'}]});
   // const products = await Product.find({status: {$ne: 'Out-of-stock'}});
   // const products = await Product.find({quantity: {$lt: 100}});
   // const products = await Product.find({name: {$in: ['Chal', 'Battery']}});
   // const products = await Product.find({}, 'name quantity');
   // const products = await Product.find({}, '-name -quantity');
   // const products = await Product.find({}).limit(1);
   // const products = await Product.find({}).sort({quantity: -1});
   // const products = await Product.find({}).select({name: 1});
   // const products = await product.where('name').equals('Battery').where('quantity')
   //   const products = await Product.find({});

   const products = await Product.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy)
   const total = await Product.countDocuments(filters);
   const page = Math.ceil(total / queries.limit)
   return { total, page, products }
};


exports.createProductService = async (data) => {
   const product = await Product.create(data);
   const {_id: productId, brand} = product;
   // step 1 _id, brand 
   const res = await Brand.updateOne(
      {_id: brand.id},
      {$push : {products: productId}}
   )
   console.log(res.nModified)
   // update Brand 
   return product;
};


exports.updateProductService = async (productId, data) => {
   // const result = Product.updateOne({_id: productId}, {$set: data}, {runValidators: true});
   // return result;

   // const product = await Product.findById(productId);
   // const result = await product.set(data).save();
   // return result;

   const result = Product.updateOne(
      { _id: productId },
      { $inc: data },
      { runValidators: true }
   );
   return result;
};

exports.bulkUpdateProductByIdService = async (data) => {
   // const result = await Product.updateMany({_id: data.ids}, data, {runValidators: true});
   // console.log(result)
   const products = [];
   data.ids.forEach(product => {
      products.push(Product.updateOne({ _id: product.id }, product.data))
   });
   const result = await Promise.all(products);
   console.log(result)
   return result;
};

exports.deleteProductByIdService = async (id) => {
   const result = await Product.deleteOne({ _id: id })
   return result;
};


exports.bulkDeleteProductService = async (ids) => {
   // const result = await Product.deleteMany({_id: ids});
   const result = await Product.deleteMany({});
   return result;
};
