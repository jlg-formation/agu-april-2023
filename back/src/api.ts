import express, { json } from "express"
import { Article, NewArticle } from "./interfaces/article"

const app = express.Router()

let articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Marteau", price: 3.5, qty: 45 },
]

const generateId = (): string => {
  return Date.now() + "_" + Math.round(Math.random() * 1e9)
}

app.get("/date", (req, res) => {
  res.json({ date: new Date() })
})

app.get("/articles", (req, res) => {
  res.json(articles)
})

app.use(json())

app.post("/articles", (req, res) => {
  const newArticle: NewArticle = req.body
  const article: Article = {
    id: generateId(),
    ...newArticle,
  }
  articles.push(article)
  res.status(201).end()
})

app.delete("/articles", (req, res) => {
  const ids: string[] = req.body
  articles = articles.filter((a) => !ids.includes(a.id))
  res.status(204).end()
})

export default app
