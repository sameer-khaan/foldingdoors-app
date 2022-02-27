const express = require("express");
const router = express.Router();
//const jwt = require('./config/jwt')

// Import Controllers
const orders = require("./controllers/orders");
const payments = require("./controllers/payments");

router.get("/api/v1/", (request, response) => {
    response.status(200).send({
        header: 'Success',
        body: 'working!',
    });
});

// Orders
router.get("/api/v1/get_order/:id", orders.getOrder);
router.post("/api/v1/add_order", orders.addOrder);

// Payment
router.post("/api/v1/make_payment", payments.makePayment);

module.exports = router;
