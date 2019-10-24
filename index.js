const express = require('express');
const db = require('./models');
const bodyParser = require('body-parser');
const HTMLing = require('htmling');
const app = express();
const port = 3000;
const { Links } = db;

app.engine('html', HTMLing.express(__dirname + '/views/'));
app.set('view engine','html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));
app.listen(port, '127.0.0.1', () => console.log(`Example ${port}`));


app.post('/api/link',  (req, res) => {
    let obj = {status: false};
    const re1 = /^[a-z]+\:\/\/[a-z]+(([a-z]+)?(\.)?([a-z]+)?)+(\S+[a-z]+)?/gm;
    if(re1.test(req.body.link)) {
        console.log('RegExp work');

        obj.shortLink = randomLink();
        obj.longLink = req.body.link;
        obj.buttonKey = !!req.body.checkbox;
        obj.status = true;
        Links.create(obj)
            .then(() => {
                res.json(obj.shortLink);
            });
    } else {
        res.sendStatus(400);
    }
});
app.post('/longLink', (req, res) => {
    Links.findOne({where: {shortLink: req.body.shortLnk}}).then((instance) => {
            res.json(instance.longLink);
    })
});
app.get('/res/:shortLinkRes', (req, res) => {
        Links.findOne({where: {shortLink: req.params.shortLinkRes},
            attributes: ['longLink','buttonKey']
        }).then((linkInstance) => {
            console.log(linkInstance.buttonKey);
            if(!!linkInstance.buttonKey) {
                console.log('1');
                res.render('button-link-view', {script: req.params.shortLinkRes});
            }
                else {
                console.log('2');
                res.redirect(linkInstance.longLink);
            }
    })
});

function randomLink() {
    return Math.random().toString(36).slice(-8);
};
