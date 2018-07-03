const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');
const userDao = require('../mongo_dal/users-dao');


//LOG IN
router.post('/', async (req, res) => {
    let receivedUser = req.body;
    const { error } = validateLogin(receivedUser);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userDao.login(receivedUser);
    if (!user) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    return res.send({ token: token });


});

//SIGN UP
router.post('/new', async (req, res) => {
    console.log('request arrived to SIGNUP route');
    let receivedUser = req.body;
    //Joi Validate - user model

    const { error } = validate(receivedUser);
    if (error) return res.status(400).send(error.details[0].message);
    //before attempt to persist, checks db email for uniqueness
    let user = await User.findOne({ email: receivedUser.email });
    if (user) return res.status(400).send('Invalid email or password.');

    user = await userDao.createUser(receivedUser);
    //responding with newly generated jwt(in header), and user - without password..
    const token = user.generateAuthToken();
    user.token = token;

    // angular new httpclient is bugged and hence cannot easily read response headers.
    //as a temporary solution, token will be appended to received user.
    //.header('X-Auth-JWT', token)
    res.send(_.pick(user, ['_id', 'username', 'email', 'isAdmin', 'token']));
})
function validateLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(35).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema);
}

//CURRENT USER
router.get('/me', auth, async (req, res) => {
    const user = await userDao.getById(req.user._id);
    res.send(user);
});

module.exports = router;