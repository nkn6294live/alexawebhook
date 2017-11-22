var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
router.route('/')
    .get(function (req, res) {
        res.json({ message: 'You are running dangerously low on beer!' });
    });
    app.use(function (req, res, next) {
        req.files = req.files ? req.files : {};
        req.users = req.users ? req.users : {};
        req.groups = req.groups ? req.groups : {};
        console.log("Request:" + req.path + "[" + req.method + "]");
        next();
});
function bkavHandler(req, res) {
    console.log("HomeID:" + req.params.homeID);
    console.log("SkillID:" + req.body.session.application.applicationId);
    console.log("Text:" + req.body.request.intent.name);
    res.send({
        response: {
            outputSpeech: {
                type: "PlainText",
                text: "Success OK"
            }
        }
    }).end();
}
router.route('/alexa/:homeID').get(bkavHandler).post(bkavHandler);
app.use('/bkav', router);

app.listen(port);
console.log('Running at ' + port);