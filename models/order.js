const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Orders', new mongoose.Schema({
    user: {
        _id: {
            type: String,
            required: true
        },
        username:
            {
                type: String,
                required: true,
                min: 4,
                max: 40,
                trim: true
            },
        email:
            {
                type: String,
                required: true,
                min: 5,
                max: 35,
                trim: true,
            }
    },
    movie: {
        _id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 55,
            trim: true
        }
    },
    price: Number
}
)
);
function validateOrder(order) {
    const schema = {
        user: {
            _id: Joi.required(),
            username: Joi.string(),
            email: Joi.string().required()
        },
        movie: {
            _id: Joi.string().required(),
            title: Joi.string().required().min(1).max(55)
        },
        price: Joi.number().required().min(0).max(500)
    };
    return Joi.validate(order, schema);
}
exports.Order = Order;
exports.validate = validateOrder;