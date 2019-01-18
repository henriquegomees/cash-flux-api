
const restifyErrors = require('restify-errors')
const User          = require('../models/User')
const bcrypt        = require('bcryptjs')


module.exports = server => {

    //Posting a new user
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

    //Fetch single user
    server.post('/api/auth', async (req, res, next) => {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if( !user ){
            res.send('User not registered')
            return next(new restifyErrors.ResourceNotFoundError('User not registered'))
        }

        bcrypt.compare( password, user.password, (err, match) => {
            if( !match ){
                return next(new restifyErrors.UnauthorizedError('Incorrect password'))
            }
            res.send('AUTHORIZED, DUDE. HERE I WILL SEND A JWT OR SOMETHING LIKE THIS. HELP ME!!')
        })
    })

}
