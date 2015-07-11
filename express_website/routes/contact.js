var express = require('express');
var nodemailer = require('nodemailer');
// Envjs is just an object with my credentials, wrapped in module.exports
var envjs = require('../../.env.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('contact');
});

router.post('/send', function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: envjs.gmail.username,
            pass: envjs.gmail.password
        }
    })

    var mailOptions = {
        // Massive injection vulnerability!!
        from: req.body.name + ' <' + escape(req.body.email) + '>',
        to: 'Sami Kurvinen <sami.kurvinen@gmail.com>',
        subject: 'Submission from nodemailer with gmail',
        text: 'You have a new submission with following body: ' + req.body,
        // Massive injection vulnerability!!
        html: '<h1>New Submission!</h1> <p>' + req.body.message + '</p>'
    }

    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
            console.log('There was an error sending email!');
        } else {
            console.log('Message sent: ' + info.response);
        }

        res.redirect('/');
    });
});

module.exports = router;
