const { Order } = require('../models/Order')
const jwt = require("jsonwebtoken");
const {SupportRequest} = require("../models/supportRequest");

class OrderController {
  static async getAllOrders (req, res) {
    console.log('fetching All Orders')
    const orderArray = await Order.find().populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

  static async getAllActiveOrders (req, res) {
    console.log('fetching All Orders')
    const orderArray = await Order.find({ order_status: 'ACTIVE' }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

  static async getOrdersByBuyerId (req, res) {
    const buyerId = req.params.id
    console.log('get orders for buyer', buyerId)
    const orderArray = await Order.find({ buyer: buyerId }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

  static async getOrdersByProducerId (req, res) {
    const producerId = req.params.id
    console.log('get orders for producer', producerId)
    const orderArray = await Order.find({ producer: producerId }).populate('item').populate('buyer').populate('producer')
    return res.send(orderArray)
  };

  static async getOrderById (req, res) {
    const orderId = req.params.id
    console.log('get order Id - ', orderId)
    const orderDetails = await Order.find({ _id: orderId }).populate('item').populate('buyer').populate('producer').populate('messages');
    console.log('get order - ', orderDetails)
    return res.send(orderDetails)
  };
	static async updateOrderDeliveryStatus (req, res) {
		const orderId = req.params.id;
		console.log("update DeliveryStatus order Id - ",orderId);
	};

	
}

module.exports.OrderController = OrderController
