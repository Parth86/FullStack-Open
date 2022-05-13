/* eslint-disable linebreak-style */

require('dotenv').config()
const express = require('express')
const app = express()
const morgan =  require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person') // mongoose model

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })

})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<div><h1>Phonebook has info for ${persons.length} people </h1> <h2>${Date()}</h2></div>`)
  })
})
app.get('/api/persons/:id', (req, res, next) => {
  const id = (req.params.id)
  Person.findById(id)
    .then(person => {
      if(person) {
        res.json(person)
      }
      else {
        res.status(400).end()
      }
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => { // update a phone record
  const id = (req.params.id)
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(id, person)
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = (req.params.id)
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    }).catch(err => next(err) ) // Pass errors to Express.
})

morgan.token('person', (req) => {
  if(req.method === 'POST') return JSON.stringify(req.body)
  return null
})
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :person'))

app.post('/api/persons', (req, res, next) => { //add a new phone record
  const body = req.body
  if (!body.name) {
    return res.status(400).json({
      error: 'name is required'
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number is required'
    })}

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))

})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})