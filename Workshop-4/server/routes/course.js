const express = require('express');
const router = express.Router();
const { coursePost, courseGet, coursePatch, courseDelete } = require('../controller/course');

router.post('/course', coursePost);
router.get('/course', courseGet);
router.patch('/course', coursePatch);
router.delete('/course', courseDelete);

module.exports = router;