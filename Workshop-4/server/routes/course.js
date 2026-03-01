const express = require('express');
const router = express.Router();
const { coursePost } = require('../controller/course');

router.post('/course', coursePost);

module.exports = router;