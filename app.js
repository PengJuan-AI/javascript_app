import express from 'express';
import bodyParser from 'body-parser'
import mysql from 'mysql2/promise'

//set up and configure express
const app = express();
const port = 3000
app.use(bodyParser.json());

//set up and intialize the database connection
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "719458145",
    database: "music_db"
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// app.get("/albums", (req, res) => {
//     connection.query("SELECT * FROM album",
//         (error,
//             results,
//             fields) => {
//             res.json(results);
//         }
//     )
//     // console.log(res)
// })

app.get("/albums", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM artist")
        res.json(rows)
    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.get("/albums/:id", async (req, res) => {

    try {
        const [row] = await connection.query(`SELECT * FROM album where id=${req.params.id}`)
        // const [row] = await connection.query("SELECT * FROM album where id=?" [req.params.id])
        // connection.query(`SELECT * FROM album where id=${req.params.id}`,
        //     (error, results, fields) => {
        //         res.json(results);
        //     }
        // )
        if (row.length > 0)
            res.json(row[0])
        else
            res.status(404).send("Artist not found")
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(port, () => {
    console.log("The server is running")
})