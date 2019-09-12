const express = require('express');
const db = require('./models');
const bodyParser = require('body-parser');
const HTMLing = require('htmling');
const app = express();
const port = 3000;
const { Links } = db;

app.engine('html', HTMLing.express(__dirname + '/views/'));
app.set('view engine','html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));
app.listen(port, '127.0.0.1', () => console.log(`Example ${port}`));

// app.post('/api/link', (req, res) => {
//     let request = new XMLHttpRequest();
//     request.onreadystatechange = function() {
//         req.body.link.in
//     }
// });

app.post('/api/link', (req, res) => {
    let obj = {};
    obj.shortLink = randomLink();
    obj.longLink = req.body.link;
    obj.buttonKey = !!req.body.with_button_checkbox;
    Links.create(obj)
        .then(() => {
            console.log(obj.shortLink);
            obj.shortLink = 'http://localhost:3000/url/' + obj.shortLink;
            res.json(obj.shortLink);
        })
});

app.post('/', bodyParser, (req, res) => {
    if(!req.body) return res.status(400);
    console.log(req.body);
    res.send(`${req.body.link}`);
});
// app.get('/url/:link', (req, res) => {
//     Links.findOne({where: {shortLink:req.params.link}})
//     .then((instance) => {
//         if (!instance.buttonKey) {
//             res.redirect(instance.longLink);
//         } else {
//             res.render('button-link-view', {link:instance.longLink}, (err, html) => {
//                 if (err) {
//                     console.error(err);
//                     res.status(500).end();
//                 } else {
//                     res.send(html);
//                 }
//             })
//         }
//     })
// });

function randomLink() {
    return Math.random().toString(36).slice(-8);
}
