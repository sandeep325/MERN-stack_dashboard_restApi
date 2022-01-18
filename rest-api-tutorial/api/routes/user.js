const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


// ==================================REST API FOR USER SIGNUP START===================================================
router.post('/signup', (req, res, next) => {
    // res.send("hello user");
    // check if mail is exist
    User.find({ email: req.body.email })
        .exec()
        .then(getdocForEmail => {
            if (getdocForEmail.length > 0) {
                return res.status(409).json({ status: 409, message: "Email already exist try another." });
            } else {
                // hash password first then save data
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            error: err,
                        });

                    }
                    else {
                        // save data finally
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,

                        });
                        user.save().then(result => {
                            console.log(result);
                            res.status(201).json({
                                status: 201,
                                id: result._id,
                                message: "User created successfully...",
                                // data: {

                                // }
                            });
                        })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ status: 500, error: err });
                            });
                    }  //end if else for hash password

                })

            }  //end if else for check mail exist
        })
        .catch(err => { console.log(err); res.status(500).json({ status: 500, error: err }); });

});

// ==================================REST API FOR USER SIGNUP END===================================================



// ==================================REST API FOR USER DELETE START===================================================

router.delete('/deleteuser/:userID', (req, res, next) => {
    const id = req.params.userID;
    // res.send(id);  return false;
    User.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            if (result.deletedCount === 1) {
                res.status(200).json({
                    status: 200,
                    deletedCount: result.deletedCount,
                    message: 'User deleted successfully...',
                });

            }
            else {
    //   res.send("test"); return false;
              return  res.status(200).json({
                    status: 204,
                    message: 'User Not found in database.',
                    deletedCount: result.deletedCount,
                });

            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ status: 500, error: err });
        });


});

// ==================================REST API FOR USER DELETE END===================================================

module.exports = router;