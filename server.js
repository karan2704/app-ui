const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const PORT = 8080

app.post('/api/state/cache', (req, res) => {
    res.status(204).json({
        error: false,
        message: "Message from server!!"
    })
})

app.listen(PORT, () => {
    console.log('listening on port 8080')
})