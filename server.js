const express = require('express')
const { json } = require('body-parser')
const { load, save } = require('./state')

const app = express()

// authorization
app.use((req, res, next) => {
  if (req.query.token !== process.env.TOKEN) {
    res.status(401).send('Token invalid. Use a valid `token` in query parameter.')
  } else {
    next()
  }
})

app.get('/:namespace/load', (req, res) => {
  res.json(load(req.params.namespace))
})

app.put('/:namespace/save', json(), (req, res) => {
  save(req.params.namespace, req.body)
  res.json(load(req.params.namespace))
})

app.post('/:namespace/reset', (req, res) => {
  save(req.params.namespace, {
    offers: []
  })
  res.json(load(req.params.namespace))
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${server.address().port}`)
})
