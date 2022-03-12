const fs = require("fs")
const express = require("express")
const app = express()
const path = require("path")
const { join } = require("path")
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static(path.join(__dirname + "/public")))

app.get("/index", (req,res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), function (err, object) {
       if (err) {
          console.log(err)
       }
       res.json(JSON.parse(object))
    })
})

app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), function (err, obj) {
        if (err) {
            console.log(err)
            return
        }
        var notes = JSON.parse(obj)

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Math.random().toString(19)
        }

        notes.push(newNote)
        
        const noteJSON = JSON.stringify(notes)

        fs.writeFile(path.join(__dirname + "/db/db.json"), noteJSON, (err) => {
           if (err) {
               console.log(err)
               return
           }
           return noteJSON
        })
    })
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
 });

