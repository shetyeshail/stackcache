'use strict';

/********************************** IMPORTS ***********************************/

const agent         = require('superagent-promise')(require('superagent'), Promise);
const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');

/******************************* INITIALIZATION *******************************/

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/cacheData', express.static(path.join(__dirname,'..', 'cacheData')));
/******************************* ELASTIC SEARCH *******************************/

const dbHost = 'cachestack-db:9200';
//const dbHost = 'localhost:9200'; // Use this when outside a docker container.

function indexExists() {
  console.log('Checking if the index exists...');
  return agent.get(`http://${dbHost}/documents`)
    .then(res => Promise.resolve(res.ok))
    .catch(err => Promise.resolve(false));
}

function createIndex() {
  console.log('Creating the index...');
  return agent.post(`http://${dbHost}/documents`)
    .send({
      mappings: {
        document: {
          properties: {
            path: { type: 'string', index: 'not_analyzed' },
            title: { type: 'string' },
            content: { type: 'string' },
            dateIndexed: { type: 'string', index: 'not_analyzed' },
          }
        }
      }
    })
    .end();
}

function deleteIndex() {
  console.log('deleting the index...');
  return agent.del(`http://${dbHost}/documents`).end();
}


function connectToIndex() {
  console.log('Connecting to the index...');
  return indexExists()
    .then((exists) => {
      if (!exists) {
        return createIndex();
      }

      return Promise.resolve();
    });
}

function createDocument(path, title, content) {
  console.log(`Creating a document (${path}, ${title}, ${content})...`);
  return agent.post(`http://${dbHost}/documents/document`)
    .send({
      path: path,
      title: title,
      content: content
    })
    .end();
}

function searchDocuments(query) {
  console.log(`Searching all documents (${query})...`);
  return agent.post(`http://${dbHost}/documents/document/_search`)
    .send({
      query: {
        match: {
          _all: {
            query: query,
            fuzziness: 2
          }
        }
      }
    })
    .end();
}

/*********************************** ROUTES ***********************************/

app.post('/api/documents', (req, res) => {
  const path = req.body.path,
    title = req.body.title,
    content = req.body.content;

  createDocument(path, title, content)
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
});

app.get('/api/documents', (req, res) => {
  console.log(req.headers.q)
  const query = req.headers.q;

  searchDocuments(query)
    .then(results => {
      const docs = results.body.hits.hits.map(hit => hit._source);
      return res.status(200).json(docs);
    })
    .catch(err => res.status(500).json(err));
});

app.post('/api/documents/delete', (req, res) => {
  deleteIndex()
    .then(createIndex)
    .then(results => res.status(200).send())
    .catch(err => res.status(500).json(err));
});
/*********************************** SERVER ***********************************/

exports.start = function() {
  connectToIndex()
    .then(() => app.listen(3000, () => console.log('Server is listening on 3000...\n')))
    .catch(err => console.log('Failed to connect to elastic search: ' + err + '.'));
};
