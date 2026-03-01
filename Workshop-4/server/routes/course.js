const express = require('express');
const router = express.Router();
const { coursePost, courseGet, coursePatch } = require('../controller/course');

router.post('/course', coursePost);
router.get('/course', courseGet);
router.patch('/course', coursePatch);

module.exports = router;