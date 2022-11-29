const { people } = require('../data')

// Controllers are the functionalities that
// should be executed when the request is made
const getPeople = (req, res) => {
    res.json({ 'success': true, 'data': people })
}

const createPerson = (req, res) => {
    //req.body is only accessible because of the 'express.json()' middleware
    const { name } = req.body
    if (!name)
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    else
        return res.status(201).json({ success : true, person: name })
}

const postPostmanPeople = (req, res) => {
    const { name } = req.body
    if (!name)
        return res.status(400).json({ success: false, msg: 'please provide name value' })
    else
        return res.status(201).json({ success: true, data: [...people, name] })
}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
    const person = people.find(person => person.id === Number(req.params.id))
    if (!person)
        return res.status(404).json({ success: false, msg: 'no person found'})
        
    const updatedPeople = people.filter(person => person.id !== Number(req.params.id))
    return res.status(200).json({ success: true, data: updatedPeople })
}

module.exports = {
    getPeople,
    createPerson,
    postPostmanPeople,
    updatePerson,
    deletePerson
}
