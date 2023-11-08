const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "secretkey";


exports.createUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword
        })
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });

    }
}

exports.loginUser = async (req, res) => {
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging with correct credentials" })
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" })
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)
        return res.json({ success: true, authToken: authToken, userData: userData })

    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }


}
exports.wantToRead = (req, res) => {
    let id = req.body.id;
    let email = req.body.email;
    let value = req.body.value;

    const query = { email: email };

    if (value === "Want to Read") {
        var update = { $push: { wtrId: id } };
    } else if (value === "Currently Reading") {
        var update = { $push: { crId: id } };
    } else {
        var update = { $push: { rId: id } };
    }


    try {


        User.updateOne(query, update, (err, result) => {
            if (err) {
                console.error("Error updating document", err);
                return res.json({ success: false });
            }

            if (result.modifiedCount > 0) {
                User.findOne(query, (err, updatedUser) => {
                    if (err) {
                        console.error("Error retrieving updated user details", err);
                        return res.json({ success: false });
                    }

                    if (updatedUser) {
                        console.log('Document updated successfully');
                        return res.json({ success: true, userData: updatedUser });
                    } else {
                        console.log('Document not found');
                        return res.json({ success: false });
                    }
                });
            } else {
                console.log('Document not updated');
                return res.json({ success: false });
            }
        });


    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }

}

exports.removeBook = (req, res) => {
    let id = req.body.id;
    let val = req.body.val;
    let email = req.body.email;


    let update;


    const query = { email: email };

    if (val === "wtr") {
        update = { $pull: { wtrId: id } };
    } else if (val === "cr") {
        update = { $pull: { crId: id } };
    } else {
        update = { $pull: { rId: id } };
    }

    try {


        User.updateOne(query, update, (err, result) => {
            if (err) {
                console.error("Error updating document", err);
                return res.json({ success: false });
            }

            if (result.modifiedCount > 0) {

                User.findOne(query, (err, updatedUser) => {
                    if (err) {
                        console.error("Error retrieving updated user details", err);
                        return res.json({ success: false });
                    }

                    if (updatedUser) {
                        console.log('Document updated successfully');
                        return res.json({ success: true, userData: updatedUser });
                    } else {
                        console.log('Document not found');
                        return res.json({ success: false });
                    }
                });
            } else {
                console.log('Document not updated');
                console.error();
                return res.json({ success: false });

            }
        });


    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }

}