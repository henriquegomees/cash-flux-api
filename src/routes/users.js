
const restifyErros = require('restify-errors')
const User         = require('../models/User')
const bcrypt       = require('bcryptjs')


module.exports = server => {

    server.post('/api/user', async (req, res, next) => {
        const { email, password } = req.body
        
        //Checking if there is already a user registered with this email.
        const users = await User.find({})
        users.find(user => {
            if( email === user.email ){
                res.send('Email already registered')
                next()
            }
        })

        //If there is no user already registered with this email, proceed to register a new user
        let newUser = new User({ email, password })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                newUser.password = hash
                try {
                    newUser.save()
                    res.send(201)
                    next()
                } catch (err) {
                    return next(new restifyErrors.InternalError(err.message))
                }
            })
        })
    })

    //Fetch all users
    server.get('/api/users', async (req, res, sed) => {
        try {
            const users = await User.find()
            res.send(users)
            next()
        } catch (err) {
            return next(new restifyErrors.InternalError(err.message))
        }
    })

}
