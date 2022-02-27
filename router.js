const express = require("express");
const router = express.Router();
//const jwt = require('./config/jwt')

// Import Controllers
const orders = require("./controllers/orders");
const payments = require("./controllers/payments");

router.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('It\'s Working!\n');
});

// Orders
router.get("/api/v1/get_order/:id", orders.getOrder);
router.post("/api/v1/add_order", orders.addOrder);

// Payment
router.post("/api/v1/make_payment", payments.makePayment);

module.exports = router;
