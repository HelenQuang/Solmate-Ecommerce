import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

//@decs Create new order
//@route POST api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingInfo,
    paymentMethod,
    shippingMethod,
    subtotalPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingInfo,
      paymentMethod,
      shippingMethod,
      subtotalPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
