const express = require('express')
const app = express()
const { people } = require('./data')

// static assets preset
app.use(express.static('./methods-public'))

// middleware for parse HTML form data (parsing application/x-www-form-urlencoded)
// mais infos sobre urlencoded -> https://expressjs.com/en/4x/api.html#express.urlencoded
app.use(express.urlencoded({ extended : false }))

// middleware for parse Javascript form data (parsing application/json)
// mais infos sobre json -> https://expressjs.com/en/4x/api.html#express.json
app.use(express.json())

// GET -> read data
app.get('/api/people', (req, res) => {
    res.json({ 'success': true, 'data': people })
})

// POST -> add data
// post method coming from the Javascript form submit
app.post('/api/people', (req, res) => {
    //req.body is only accessible because of the 'express.json()' middleware
    const { name } = req.body
    if (!name)
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    else
        return res.status(201).json({ success : true, person: name })
})

app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name)
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    else
        return res.status(201).json({ success: true, data: [...people, name] })
})

// post method coming from the HTML form submit
app.post('/login', (req, res) => {
    //req.body is only accessible because of the 'express.urlencoded()' middleware
    const { name } = req.body;
    if (!name)
        return res.status(401).send('Please provide credentials')
    else
        return res.status(201).send(`Welcome, ${name}`)
})

// PUT -> update data
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const person = people.find(person => person.id === Number(id))
    if (!person)
        return res.status(404).json({ success: false, msg: 'no person found'})

    const updatedPeople = people.map(person => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    return res.status(200).json({ success: true, data: updatedPeople })
})

// DELETE -> delete data
app.delete('/api/people/:id', (req, res) => {
    const person = people.find(person => person.id === Number(req.params.id))
    if (!person)
        return res.status(404).json({ success: false, msg: 'no person found'})
        
    const updatedPeople = people.filter(person => person.id !== Number(req.params.id))
    return res.status(200).json({ success: true, data: updatedPeople })
})

app.listen(5000, () => {
    console.log('server listening on port 5000...');
})
