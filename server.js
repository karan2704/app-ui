const express = require('express')
const app = express()

const PORT = 8080

app.get('/', (req, res) => {
    res.status(204).json({
        error: false,
        message: `Response from home route /`
    })
})

app.listen(PORT, () => {
    console.log('listening on port 8080')
})