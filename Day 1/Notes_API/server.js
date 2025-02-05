const express = require ('express');
const mongoose = require ('mongoose');
const app = express ();
const port = 3000;

app.use (express.json ());

mongoose
  .connect ('mongodb://localhost:27017/notesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => console.log ('MongoDB Connected'))
  .catch (err => console.error ('MongoDB Connection Error:', err));

const noteSchema = new mongoose.Schema ({
  title: String,
  content: String,
});

const Note = mongoose.model ('Note', noteSchema);

app.get ('/notes', async (req, res) => {
  try {
    const notes = await Note.find ();
    res.json (notes);
  } catch (err) {
    res
      .status (500)
      .json ({message: 'Error fetching notes', error: err.message});
  }
});

app.get ('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById (req.params.id);
    if (!note) {
      return res.status (404).json ({message: 'Note not found'});
    }
    res.json (note);
  } catch (err) {
    res
      .status (500)
      .json ({message: 'Error fetching note', error: err.message});
  }
});

app.post ('/notes', async (req, res) => {
  try {
    const {title, content} = req.body;
    const note = new Note ({title, content});
    await note.save ();
    res.status (201).json (note);
  } catch (err) {
    res
      .status (500)
      .json ({message: 'Error creating note', error: err.message});
  }
});

app.put ('/notes/:id', async (req, res) => {
  try {
    const {title, content} = req.body;
    const note = await Note.findByIdAndUpdate (
      req.params.id,
      {title, content},
      {new: true}
    );
    if (!note) {
      return res.status (404).json ({message: 'Note not found'});
    }
    res.json (note);
  } catch (err) {
    res
      .status (500)
      .json ({message: 'Error updating note', error: err.message});
  }
});

app.delete ('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete (req.params.id);
    if (!note) {
      return res.status (404).json ({message: 'Note not found'});
    }
    res.json (note);
  } catch (err) {
    res
      .status (500)
      .json ({message: 'Error deleting note', error: err.message});
  }
});

app.delete ('/notes', async (req, res) => {
  try {
    await Note.deleteMany ();
    res.json ({message: 'All notes deleted successfully'});
  } catch (err) {
    res
      .status (500)
      .json ({message: 'Error deleting notes', error: err.message});
  }
});

app.listen (port, () => {
  console.log (`Notes API running at http://localhost:${port}`);
});
