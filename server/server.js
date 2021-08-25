const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const PORT = 5000

async function start() {
    try {
        await mongoose.connect("mongodb+srv://test:qerty123@cluster0.fgvm1.mongodb.net/todos", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`app has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

const todoSchema = new mongoose.Schema({
    title: String,
    complete: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('todo', todoSchema)

app.get("/todos", (req, res) => {
    Todo.find().then(todo => res.json(todo))
})

app.post("/todos", (req, res) => {
    const newTodo = new Todo({
        title: req.body.title
    })
    newTodo.save().then(todo => res.json(todo))
})

app.delete("/todos/:id", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json({ remove: true }))
})


















// ########################################

// const express = require("express")
// const mongoose = require("mongoose")

// const app = express()
// app.use(express.json())

// // const db = "mongodb+srv://nikolay:beforo38!!@cluster0.wkxqw.mongodb.net/todos"


// const db = "mongodb+srv://test:qerty123@cluster0.fgvm1.mongodb.net/todos"

// mongoose.connect(db, ({ useNewUrlParser: true }))
//     .then(console.log("Connected to MongoDB"))
//     .catch(err => console.log(err))

// const todoSchema = new mongoose.Schema({
//     title: String,
//     complete: {
//         type: Boolean,
//         default: false
//     }
// })

// const Todo = mongoose.model('todo', todoSchema)

// app.get("/todos", (req, res) => {
//     Todo.find().then(todo => res.json(todo))
// })

// app.post("/todos", (req, res) => {
//     const newTodo = new Todo({
//         title: req.body.title
//     })
//     newTodo.save().then(todo => res.json(todo))
// })

// app.delete("/todos/:id", (req, res) => {
//     Todo.findByIdAndDelete(req.params.id)
//         .then(() => res.json({ remove: true }))
// })

// app.listen(5000, () => {
//     console.log("server is running at port 5000")
// })