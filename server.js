const express = require('express')
const { json } = require('body-parser')
const { load, save, create } = require('./state')

const app = express()

// authorization
app.use((req, res, next) => {
  if (req.query.token !== process.env.TOKEN) {
    res.status(401).send('Token invalid. Use a valid `token` in query parameter.')
  } else {
    next()
  }
})

app.get('/:namespace', (req, res) => {
  let status, result
  try {
    result = load(req.params.namespace)
    status = 200
  } catch (e) {
    if (e.code === 'ENOENT') {
      status = 404
    } else {
      status = 500
    }
  } finally {
    res = res.status(status)
    if (result) {
      res.json(result)
    } else {
      res.end()
    }
  }
})

app.post('/:namespace', json(), (req, res) => {
  let status, result
  try {
    save(req.params.namespace, req.body)
    result = load(req.params.namespace)
    status = 200
  } catch (e) {
    if (e.code === 'ENOENT') {
      create(req.params.namespace)
      save(req.params.namespace, req.body)
      result = load(req.params.namespace)
      status = 200
    } else {
      status = 500
    }
  } finally {
    res.status(status).json(result)
  }
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${server.address().port}`)
})
