const express = require('express');
const db = require('./models');
const bodyParser = require('body-parser');
const HTMLing = require('htmling');
const app = express();
const port = 3000;
const {Links} = db;

app.engine('html', HTMLing.express(__dirname + '/views/'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('static'));
app.listen(port, '127.0.0.1', () => console.log(`Started at port: ${port}`));


app.post('/api/link', (req, res) => {
  const obj = {status: false};
  const re1 = /^[a-z]+\:\/\/[a-z]+(([a-z]+)?(\.)?([a-z]+)?)+(\S+[a-z]+)?/gm;
  if (re1.test(req.body.link)) {
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
  });
});
app.get('/res/:shortLinkRes', (req, res) => {
  Links.findOne({where: {shortLink: req.params.shortLinkRes},
    attributes: ['longLink', 'buttonKey'],
  }).then((linkInstance) => {
    if (!!linkInstance.buttonKey) {
      res.render('button-link-view', {script: req.params.shortLinkRes});
    } else {
      res.redirect(linkInstance.longLink);
    }
  });
});

// eslint-disable-next-line require-jsdoc
function randomLink() {
  return Math.random().toString(36).slice(-8);
}
