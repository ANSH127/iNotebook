const express = require('express')
const router = express.Router();
const Note = require('../models/notes')
const { body, validationResult } = require('express-validator');

const fetchuser = require('../middleware/fetchuser')


// ROUTE 1: Get all the notes using:GET "/api/auth/fetchallnotes"  login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })

        res.json(notes)

    } catch (error) {

        res.status(500).send('internal server error')

        console.log(error.message)
    }

})

// ROUTE 2: add a new  notes using:POST "/api/auth/addnote"  login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 2 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save()

        res.json(savedNote)


    } catch (error) {
        res.status(500).send('internal server error')

        console.log(error.message)

    }

})
// ROUTE 3: update an existing   notes using:PUT "/api/auth/updatenote"  login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create a new note object
    const newNote = {};
    try {
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('not found')
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')

        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        res.status(500).send('internal server error')

        console.log(error.message)

    }


})

// ROUTE 4: deleting a  notes using:DELETE "/api/auth/deletenote"  login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // find the note to be Delete and delete it
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('not found')
        }
        // allow deletion only if users owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')

        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Sucess": "note has been deleted", note });
    }
    catch (error) {
        res.status(500).send('internal server error')

        console.log(error.message)

    }


})
module.exports = router