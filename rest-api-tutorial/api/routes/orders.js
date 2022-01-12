const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const product = require("../models/product");



// =======================================GET ORDER List REST-API START=========================================================

router.get("/", (req, res, next) => {

    Order.find().select("_id product quantity name ").populate("product" ,"name price").sort({ _id: -1 })
        .exec()
        .then(result => {
            res.status(200).json({
                countOrder: result.length,
                orders: result.map(data => {

                    return {

                        _id: data._id,
                        product: data.product,
                        name: data.name,
                        quantity: data.quantity,
                        request: {
                            type: 'GET',

                            url: `http://localhost:8080/orders/${data._id}`
                        }
                    }
                })
            });

        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

});

// =======================================GET ORDER List REST-API END=========================================================



// =======================================GET ORDER DETAIL BYID REST-API END=========================================================
router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.findById({ _id: id }).select("_id product name quantity")
        .exec()
        .then(result => {

            if(!result) {
                return res.status(404).json({message:`Order not found for id:${id}`});
            }
            res.status(200).json({
                _id: result._id,
                product: result.product,
                name: result.name,
                quantity: result.quantity,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8080/orders'
                }

            });
        }).catch(err => {

            res.status(500).json({ error: err });
        });


});
// =======================================GET ORDER DETAIL BYID REST-API END=========================================================





// =======================================POST ORDER REST-API START=========================================================
router.post("/addorders", (req, res, next) => {
    // res.json(req.body); return false;
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
        name: req.body.name
    });
    // first it check to database product id avilability.
    product.findById(req.body.productId).then(

        order.save().then(result => {
            res.status(201).json({
                message: 'You have successfully order...',
                data: {
                    _id: result._id,
                    name: result.name,
                    product: result.product,
                    quantity: result.quantity,
                    request: { type: 'GET', url: `http://localhost:8080/orders` }
                }

            });
        })
            .catch(err => {
                res.status(500).json({ error: err });
            })

    )
        .catch(err => {
            res.status(500).json({ message: 'product not found on database.', error: err });
        });


});

// =======================================POST ORDER REST-API END=========================================================



// =======================================DELETE ORDER REST-API START=========================================================
router.delete("/delete-orders/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    //   res.status(200).json(id); return false;

    Order.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount == 1) {
                res.status(200).json({ message: 'Your order is successfully deleted...', result });

            } else {
                res.status(200).json({ message: 'Your order could not deleted please try again...', result });

            }

        }).catch(err => {
            res.status(500).json({ error: err });
        });

});
// =======================================DELETE ORDER REST-API END=========================================================


// =======================================UPDATE ORDER REST-API START=========================================================
router.put('/update-orders/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    const orderU = {};
    for (odr of req.body) {
        orderU[odr.propName] = odr.value;
    }

    Order.updateOne({_id:id},{$set:orderU})
        .exec()
        .then(result => {
            if(result.acknowledged == true && result.modifiedCount == 1) {
            res.status(200).json({
                message: 'Your order is updated successfully...',
                data: {
                    _id: id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8080/orders/${id}`
                    }
                }
            });

            } else {

                res.status(200).json({
                    message: 'Your order is not  updated please try again ...',
                });

             }
            
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

});

// =======================================UPDATE ORDER REST-API END=========================================================


module.exports = router;
