
const restifyErrors = require('restify-errors')
const Expense       = require('../models/Expense') 

module.exports = server => {

    //Fetch all expenses
    server.get('/api/expenses', async (req, res, next) => {
        try {
            const expenses = await Expense.find({})
            res.send(expenses) 
            next()
        } catch (err) {
            return next(new restifyErrors.InvalidContentError(err))
        }
    })

    //Fetch a single expense
    server.get('/api/expenses/:id', async (req, res, next) => {
        const { id } = req.params

        try {
            const expense = await Expense.findById(id)
            res.send(expense)
            next()
        } catch (err) {
            return next(
                new restifyErrors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`)
            )
        }
    })

    //Save an expense
    server.post('/api/expenses', async (req, res, next) => {
        const { name, amount, description } = req.body
        const expense = new Expense({ name, amount, description })

        try {
            await expense.save()
            res.send(201)
            next()
        } catch (err) {
            return next(new restifyErrors.InternalError(err.message))
        }
    })

    //Update an expense
    server.put('/api/expenses/:id', async (req, res, next) => {
        try {
            await Expense.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.send(200)
            next()
        } catch (err) {
            return next(
                new restifyErrors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`)
            )
        }
    })

    //Remove an expense
    server.del('/api/expenses/:id', async (req, res, next) => {
        try {
            await Expense.findOneAndRemove({ _id: req.params.id })
            res.send(204)
            next()
        } catch (err) {
            return next(
                new restifyErrors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`)
            )
        }
    })
    
}
