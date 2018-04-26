const express = require('express')
const router = express.Router()
const Schema = require('../db/schema.js')
const { Creature } = Schema

// INDEX route
router.get('/', async (req, res) => {
    try {
        const creatures = await Creature.find({})
        res.json(creatures)
    } catch (err) {
        console.log(err)
    }
})

// CREATE route
router.post('/', async (req, res) => {
    try {
        const newCreature = req.body
        const savedCreature = await Creature.create(newCreature)
        res.json(savedCreature)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// UPDATE route
router.put('/:id', async (req, res) => {
    try {
        const creatureId = req.params.id
        const updatedCreature = req.body
        const savedCreature = await Creature.findByIdAndUpdate(creatureId, updatedCreature)
        res.json(savedCreature)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// SHOW route
router.get('/:id', async (req, res) => {
    try {
        const creatureId = req.params.id
        const creature = await Creature.findById(creatureId)
        res.json(creature)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

// DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const creatureId = req.params.id
        await Creature.findByIdAndRemove(creatureId)
        res.json({
            msg: 'Successfully Deleted'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
