const mongoose = require('mongoose')
const Joi =require('joi');

const studentsSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4, maxlength: 200},
    isEnrolled: {type: Boolean, default: false },
    phone: {type: String, required: true, minlength: 10, maxlength: 25},    
})

const Student = mongoose.model('Student', studentsSchema)

function validateData(student){
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).max(50).required(),
        isEnrolled: Joi.boolean()
    }
    return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validateData = validateData;