const server = require('./src/server')
const {PORT} = require('./config/index')


server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})