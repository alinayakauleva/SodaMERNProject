const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        console.log("in register");
        console.log(req.body);
        const user = new User(req.body);

        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log("Successfully registered!");
                res.json({
                    successMessage: "Thank you for registering!",
                    user: newUser,
                });
            })
            .catch((err) => {
                console.log("register NOT successful");
                console.log(err);
                res.status(400).json(err);
            });
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((userRecord) => {
                
                if (userRecord === null) {
                    res.status(400).json({ message: "Invalid email or password" });
                } else {
                    console.log("gets here");
                    bcrypt
                        .compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                console.log("password is valid");

                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username,
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000),
                                    },
                                ).json({
                                    message: "Successfully Logged in",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id,
                                });
                            } else {
                                res.status(400).json({
                                    message: "Login and/or Email Invalid",
                                });
                            }
                        })

                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                message: "Invalid Attempt",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log("error");
                res.status(400).json({ message: "Invalid Attempt" });
            });
    },

    logout: (req, res) => {
        console.log("logging out");
        console.log(req.cookies);
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out!",
        });
    },

    getOneUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateUser: (req, res) => {
        console.log(req.body);
        User.findOneAndUpdate({_id : req.params.id}, {favorites: req.body.favorites}, {new: true})
        .then(updateUser => res.json(updateUser))
        .catch(err => res.status(400).json(err));
    },
};