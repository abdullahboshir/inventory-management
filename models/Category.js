const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provice a category'],
        trum: true,
        lowercase: true,
        unique: true
    },
    description: String,
    imageUrl: {
        type: String,
        validator: [validator.isUrl, 'Please provide a valid URL']
    }
},
{
    timestamps: true
}
);

const Category = mongoose.model('Category', categorySchema);


module.exports = Category;