const express    = require("express")
const cors       = require("cors")
const rate_limit = require("express-rate-limit")

require('dotenv').config()

const app = express()
app.use(cors())

const limiter = rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(limiter)
app.set('trust proxy', 1)

app.use('/api', require('./routes/api'))
app.use((req, res) => {
    res.status(404).send({ error: { error: "nothing_found", error_description: "Page not found" }})
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))