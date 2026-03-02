const express = require('express');
const router = express.Router();
const { professorPost, professorGet, professorPatch, professorDelete } = require('../controller/professor');

router.post('/professor', professorPost);
router.get('/professor', professorGet);
router.patch('/professor', professorPatch);
router.delete('/professor', professorDelete);

module.exports = router;