const {User} = require('../models/User')

const signupService = async (data) => {
    return await User.create(data)
}

module.exports = {signupService}