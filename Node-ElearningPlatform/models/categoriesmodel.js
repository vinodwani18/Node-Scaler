const mongoose = require('mongoose')
const Joi =require('joi');

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4, maxlength: 200},
    id: {type: Number, }
})

const Category = mongoose.model('Category', categorySchema)

function validateData(category){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validateData = validateData;