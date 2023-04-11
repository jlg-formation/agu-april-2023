console.log("About to start a web server...")

const express = require("express")
const serveIndex = require("serve-index")
const api = require("./api")

const app = express()
const port = 3000
const publicDir = "."

app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})

app.use("/api", api)

app.use(express.static(publicDir))
app.use(serveIndex(publicDir, { icons: true }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
