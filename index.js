const express = require('express')
const { loadConfig } = require('./init/config_loader')
const app = express()
const port = 3000


loadConfig()

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


