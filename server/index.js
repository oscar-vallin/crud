const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    database: 'crud',
    user: 'root',
    password: 'password',
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req,res) => {
    const sqlSelect = "SELECT * FROM empleado;"
    db.query(sqlSelect, (err,result) => {
        res.send(result)
    });
});

app.post("/api/insert", (req,res) => {

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const cargo = req.body.cargo

    const sqlInsert = "INSERT INTO empleado(nombre, apellido, cargo) VALUES (?,?,?);"
    db.query(sqlInsert, [nombre, apellido, cargo], (err, result) => {
        console.log(result)
    });
});

app.delete("/api/delete/:nombre", (req,res) => {
    const nombre = req.params.nombre;

    const sqlDelete = "DELETE FROM empleado WHERE nombre = ?;"

    db.query(sqlDelete, nombre, (err, result) => {
        if(err) console.log(err);
    });
});


app.put("/api/update", (req,res) => {
    const nombre = req.body.nombre;
    const cargo = req.body.cargo

    const sqlUpdate = "UPDATE empleado SET  cargo = ? WHERE nombre = ?;"

    db.query(sqlUpdate, [cargo, nombre], (err, result) => {
        if(err) console.log(err);
        console.log(result)
    })
});

app.listen(4000, () => {
    console.log("Start on PORT 4000");
});
