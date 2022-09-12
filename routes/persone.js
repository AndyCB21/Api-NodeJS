const express = require('express');
const router = express.Router();
const { persone } = require('../persone') //dati

//Lista Utenti
router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: persone })
})

//Dati Utente
router.get('/:id', (req, res) => {
    const { id } = req.params
    const persona = persone.find(
        (persona) => persona.id === id
    )
    if (persona) {
        res.status(200).json({ success: true, data: persona })
    } else {
        res.status(400).json({ success: false, message: 'ID non trovato' })
    }
})

//Nuovo Utente
router.post('/', (req, res) => {
    const persona = req.body
    const personeFilter = persone.find((persona) => persona.id === req.body.id)
    if (personeFilter) {
        res.status(400).json({ success: false, message: 'ID già esistente' })
    } else {
        persone.push(persona)
        res.status(200).json({ success: true, data: persone })
    }
})

//Modifica Utente
router.put('/:id', (req, res) => {
    const { id } = req.params
    const index = persone.findIndex(persona => persona.id === id)
    const persona = req.body
    if (persone[index]) {
        persone[index] = persona
        res.status(200).json({ success: true, data: persone })
    } else {
        res.status(400).json({ success: false, message: 'ID non trovato' })
    }
})

//Cancella Utente
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = persone.findIndex(persona => persona.id === id)

    if (index !== -1) {
        persone.splice(index, 1)
        res.status(200).json({ success: true, data: persone })
    } else {
        res.status(400).json({ success: false, message: 'ID non trovato' })
    }
})

module.exports = router

