const server = require('./src/server')
const {PORT} = require('./config/index')


server.listen(() => {
    console.log(`server is running on ${PORT}`)
})