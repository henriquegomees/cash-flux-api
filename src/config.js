
module.exports = {
    ENV      : process.env.NODE_ENV  || 'development',
    PORT     : process.env.PORT      || 8080,
    BASE_URL : process.env.BASE_URL  || 'http://localhost:8080',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://admin:limapinto10@ds159204.mlab.com:59204/cash-flux'
}
