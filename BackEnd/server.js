const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

//get data
app.get("/", (res) => {
  return res.json("from backend side");
});

app.get("/expenses", (req, res) => {
  const sql = "SELECT * FROM expenses";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//delete data
app.delete("/expenses/:id", (req, res) => {
  const expenseId = req.params.id;
  const sql = "DELETE FROM expenses WHERE id = ?";
  db.query(sql, [expenseId], (err) => {
    if (err) return res.json(err);
    res.send(`expense with the id of ${expenseId} deleted`);
    console.log(`delete expense with the id of ${expenseId}`);
  });
});

//add data
app.post("/expenses", (req, res) => {
  const newEx = req.body;
  const sql = "INSERT INTO expenses SET ?";
  db.query(sql, [newEx], (err, data) => {
    if (err) return res.json(err);
    const insertedData = { id: data.insertId, ...newEx };
    res.send(insertedData);
    console.log(`add expense with the id of ${data.insertId}`);
  });
});

app.listen(8080, () => {
  console.log("listenning");
});
