require('dotenv').config({ path: './config/config.env' })
const app = require('./app')
const connectDB = require('./config/database')

const PORT = process.env.PORT || 4000

connectDB();

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`)
})
