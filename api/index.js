var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ElasticIndex = require('./elasticSearchindex.js');
var addDocument = ElasticIndex.addDocument;
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/api/documents', (req, res) => {
  addDocument({
    title: req.body.title,
    content: req.body.content,
    url: req.body.url
  }).then(() => {
    res.send();
  }).catch((err) => {
    res.status(500).send(err);
  });

});

app.get('/api/documents/search', (req, res) =>{
  ElasticIndex.indexSearch(req.query.q).then((suggestions) => {
    res.json(suggestions);
  }).catch((err) => {
    res.status(500).send(err);
  });
  //res.json({some: "dsf"});
});



/*var elastic = require('./elasticsearch');
elastic.indexExists().then(function (exists) {
  if (exists) {
    return elastic.deleteIndex();
  }
}).then(function () {
  return elastic.initIndex().then(elastic.initMapping).then(function () {
    //Add a few book titles for the autocomplete
    //elasticsearch offers a bulk functionality as well, but this is for a different time
    var promises = [
      'Thing Explainer',
      'The Internet Is a Playground',
      'The Pragmatic Programmer',
      'The Hitchhikers Guide to the Galaxy',
      'Trial of the Clone',
      'All Quiet on the Western Front',
      'The Animal Farm',
      'The Circle'
    ].map(function (bookTitle) {
      return elastic.addDocument({
        title: bookTitle,
        content: bookTitle + " content!",
        metadata: {
          titleLength: bookTitle.length
        }
      });
    });
    return Promise.all(promises);
  });
});


module.exports = app;
*/

ElasticIndex.indexExists().then(function (exists) {
  if (exists) {
    return ElasticIndex.deleteIndex();
  }
}).then(function () {
  return ElasticIndex.initIndex().then(ElasticIndex.initMapping).then(function () {
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!');
    });
  });
});
