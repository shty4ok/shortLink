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

app.post('/api/link', (req, res) => {
    let obj = {};
    obj.shortLink = randomLink();
    obj.longLink = req.body.link;
    obj.buttonKey = !!req.body.with_button_checkbox;
    //для базы данных Link запишим обьект obj, а после этого выполняется then
    Links.create(obj)
        .then(() => {
             res.json(obj.shortLink);
        })
});
app.post('/', bodyParser, (req, res) => {
    if(!req.body) return res.status(400);
    // console.log(req.body);
    res.send(`${req.body.link}`);
});
app.get('/api/link/:shortLink', (req, res) => {
    Links.findOne({where: {shortLink: req.params.shortLink},
            attributes: ['buttonKey', 'longLink']
    }).then((project) => {
        console.log(JSON.stringify(project));
    })
});

function randomLink() {
    return Math.random().toString(36).slice(-8);
};
