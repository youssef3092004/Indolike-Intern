const Note = require ('../models/noteModel');

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find ();
    res.status (200).json (notes);
  } catch (error) {
    next (error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById (req.params.id);
    if (!note) {
      return res.status (404).json ({message: 'Note not found'});
    }
    res.status (200).json (note);
  } catch (error) {
    next (error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const {title, content} = req.body;
    const note = new Note ({title, content});
    await note.save ();
    res.status (201).json (note);
  } catch (error) {
    next (error);
  }
};

const updateNote = async (req, res, next) => {
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
    res.status (200).json (note);
  } catch (error) {
    next (error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete (req.params.id);
    if (!note) {
      return res.status (404).json ({message: 'Note not found'});
    }
    res.status (200).json ({message: 'Note deleted successfully'});
  } catch (error) {
    next (error);
  }
};

const deleteAllNotes = async (req, res, next) => {
  try {
    const result = await Note.deleteMany ();
    if (result.deletedCount === 0) {
      return res.status (404).json ({message: 'No notes found to delete'});
    }
    res
      .status (200)
      .json ({message: `${result.deletedCount} notes deleted successfully`});
  } catch (error) {
    next (error);
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  deleteAllNotes,
};
