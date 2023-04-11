console.log("About to start a web server...")

const express = require("express")
const app = express()
const port = 3000

app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
