require('dotenv').config({ path: './config/config.env' })
const app = require('./app')
const connectDB = require('./config/database')

const PORT = process.env.PORT || 4000

//handle uncaught exptions
process.on('uncaughtException',err =>{
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`)
})

//handle unhandled promise rejection errors

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to unhandled Promise Rejection')
    server.close(() => {
        process.exit(1)
    })
})