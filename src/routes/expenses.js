
module.exports = server => {

    server.get('/api/expenses', (req, res, next) => {
        res.send('Server is running...')
        next()
    })

}
