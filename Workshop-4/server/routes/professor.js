const express = require('express');
const router = express.Router();
const { professorPost } = require('../controller/professor');

router.post('/professor', professorPost);

module.exports = router;