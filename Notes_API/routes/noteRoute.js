const Router = require ('express');
const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
  deleteAllNotes,
} = require ('../controllers/noteController');

const router = Router ();

router.get ('/notes', getNotes);
router.get ('/notes/:id', getNote);
router.post ('/notes', createNote);
router.put ('/notes/:id', updateNote);
router.delete ('/notes/:id', deleteNote);
router.delete ('/notes', deleteAllNotes);

module.exports = router;
