const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()

app.use(bodyParser.json())

app.get("/", (req, res)=> {
    res.json("Response...")
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
