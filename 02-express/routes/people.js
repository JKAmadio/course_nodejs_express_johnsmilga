const express = require('express')

// import controllers functions
const { getPeople, createPerson, postPostmanPeople, updatePerson, deletePerson } = require('../controllers/people')

// we envolke the Router method from express
// mais infos: https://expressjs.com/en/4x/api.html#express.router
const router = express.Router()

// As we already told on app.js the base of the route ('/api/people')
// we MUST remove it from here and envolke the controls related to the request
router.get('/', getPeople)
router.post('/', createPerson)
router.post('/postman', postPostmanPeople)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

/** 
 *  Another way to set the routers
 *
 *  router.route('/').get(getPeople).post(createPerson)
 *  router.route('/:id').put(updatePerson).delete(deletePerson)
 *  router.route('/postman').post(postPostmanPeople) 
 */

module.exports = router
