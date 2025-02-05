const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const usersControllers = require('../controllers/users-controllers');

const fileUpload = require('../middleware/file-upload');
const multer = require('multer');

router.get('/', usersControllers.getUsers);

router.post(
    '/signup',
    // fileUpload.single('image'),
    multer({ dest: 'uploads/images' }).single('image'),
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    usersControllers.signup
);

router.post('/login', usersControllers.login);

module.exports = router;
