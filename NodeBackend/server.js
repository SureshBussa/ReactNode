const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({ host: "localhost", user: "root", password: "Saeiou@621", database: "employee_management_system" })
app.get("/api/v1/employees", (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});

app.get("/api/v1/employees/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE ID = ?";
    db.query(sql, [id], (err, data) => {
      if (err) throw err;
      return res.json(data);
  });

});

app.post("/api/v1/employees", (req, res) => {
    const sql = "INSERT INTO employees (`first_name`,`last_name`,`email_id`,`department`,`salary`,`gender`,`dob`,`image`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.emailId,
        req.body.department,
        req.body.salary,
        req.body.gender,
        req.body.dob,
        req.body.image
    ]
    db.query(sql, [values], (err, data) => {
        if (err)  throw err;
        return res.json(data);
    })
})

app.put("/api/v1/employees/:id", (req, res) => {
    const sql = "UPDATE employees SET `first_name` = ?,`last_name` = ?,`email_id` = ?,`department` = ?,`salary` = ?,`gender` = ?,`dob` = ?,`image` = ? WHERE ID = ?";
    const values = [req.body.firstName, req.body.lastName, req.body.emailId, req.body.department, req.body.salary, req.body.gender, req.body.dob, req.body.image]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) throw err;
        return res.json(data);
    })
})

app.delete("/api/v1/employees/:id", (req, res) => {
    const sql = "DELETE FROM employees WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err)  throw err;
        return res.json(data);
    })
})
app.post("/reguser", async (req, res) =>{
    const sql="INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) throw err;
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
             return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success")
        }
        else{
            return res.json("Failed")
        }
    })
})

app.listen(8090, () => { console.log("listening"); })