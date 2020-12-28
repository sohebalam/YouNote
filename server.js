import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import User from "./models/user.js"

dotenv.config({ path: "./.env" })
mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
mongoose.connection.on("connected", () => {
  console.log("DB connected!!!")
})

mongoose.connection.on("error", (err) => {
  console.log("err connected!!!", err)
})

const app = express()

const PORT = 5000

const customMiddleware = (req, res, next) => {
  console.log("middleware executed!!!")
  next()
}

app.get("/", (req, res) => {
  console.log("home")
  res.send("hello world!!!!")
})
app.get("/about", customMiddleware, (req, res) => {
  console.log("about")
  res.send("about!!!!")
})

app.listen(PORT, () => {
  console.log("server is running on ", PORT)
})
