const express = require('express');
const router = express.Router();
const { coursePost, courseGet } = require('../controller/course');

router.post('/course', coursePost);
router.get('/course', courseGet);

module.exports = router;