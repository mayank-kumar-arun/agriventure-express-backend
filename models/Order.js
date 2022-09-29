const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer',
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    payment_status: {
        type: String,
        required: true,         // PENDING, PAID
        default: "PENDING"
    },
    delivery_status: {
        type: String,
        required: true,         // PROCESSING, OUT-FOR-DELIVERY, DELIVERED
        default: "PROCESSING"
    },
    order_price: {
        type: Number,
        required: true
    },
    order_date_time: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    order_delivery_address: String,
    order_delivery_city: String,
    order_delivery_zipcode:String
});

exports.Order = mongoose.model('Order',orderSchema);
