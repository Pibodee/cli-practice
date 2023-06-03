const express = require('express')
const router = express.Router();

const { signup, login, logout } = require("../controllers/authControllers");
const { createUserValidationSchema, loginUserValidationSchema } = require('../utils/validation/authValidation')
const {validateBody} = require("../utils/validateBody");
const { auth } = require('../middlewares/auth');


router.post('/signup', validateBody(createUserValidationSchema), signup)
router.post('/login', validateBody(loginUserValidationSchema), login)
router.post('/logout', auth, logout)


module.exports = {authRouter :router}