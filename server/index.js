const { PORT, CERTS } = process.env
const https = require('https')
const fs = require('fs')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(cors({ origin: '*' }))

app.get('/api', (req, res) => {
  res.status(200).send('Ok')
})

// Static service
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})

if (CERTS) {
  https
    .createServer(
      {
        key: fs.readFileSync(path.resolve(CERTS, './server.key')),
        cert: fs.readFileSync(path.resolve(CERTS, './server.cert')),
      },
      app
    )
    .listen(PORT || 8088, () => {
      console.log(`Service started on ${PORT || 8088}`)
    })
} else {
  app.listen(PORT || 8088, () => {
    console.log(`Service started on ${PORT || 8088}`)
  })
}
