const mongoose = require('mongoose');
const { Order, validate } = require('../models/order');

async function saveOrder(order) {
    order = new Order({
        user: order.user,
        movie: order.movie,
        price: order.price
    })

    return await order.save();
}

module.exports.saveOrder = saveOrder;
