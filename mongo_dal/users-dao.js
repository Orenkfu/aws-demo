const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');




async function createUser(receivedUser) {
    user = new User({
        username: receivedUser.username,
        email: receivedUser.email,
        password: receivedUser.password,
        isAdmin: receivedUser.isAdmin,
    });
    user.password = await bcryptHash(user.password);
    await user.save();
    return user;
}

async function login(loginDetails) {
    let user = await User.findOne({ email: loginDetails.email });
    //opposite of signup: if user doesnt exist, details are invalid.
    if (!user) return false;

    const validLogin = await bcrypt.compare(loginDetails.password, user.password);
    return validLogin ? user : null;
}

async function getById(id) {
    //exclude password
    return await User.findById(id).select('-password');
}
async function bcryptHash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
module.exports.createUser = createUser;
module.exports.login = login;
module.exports.getById = getById;