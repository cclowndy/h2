const express = require('express');
const Axios = require("axios")
const public_users = express.Router();


public_users.get('/', (req, res) => {
    const getData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data);
            }, 1000);
        });
    };

    getData()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: "An error occurred" });
        });

});


module.exports.general = public_users;
