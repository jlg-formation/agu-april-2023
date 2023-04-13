import express from "express"
import { Article } from "./interfaces/article"

const app = express.Router()

const articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Marteau", price: 3.5, qty: 45 },
]

app.get("/date", (req, res) => {
  res.json({ date: new Date() })
})

app.get("/articles", (req, res) => {
  res.json(articles)
})

export default app
