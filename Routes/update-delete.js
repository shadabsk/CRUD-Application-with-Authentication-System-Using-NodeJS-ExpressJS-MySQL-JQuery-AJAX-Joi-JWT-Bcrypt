const express = require('express');
const router = express.Router({mergeParams: true});
const mysqlConnection = require('../database');
const verify = require("../verifyToken");
const verifyrest = require("../verifyTokenRest");

//update using form
router.post("/update", verify, (req, res) => {
    mysqlConnection.query(
        "UPDATE employee set Name = ?,EmpCode = ?, Salary = ? WHERE EMPID= ?",
        [req.body.Name, req.body.EmpCode, req.body.Salary, req.params.id], (err, rows, fields) => {
            !err ? res.redirect("/view") : console.log(err);
        }
    );
});

//update using endpoint api
router.patch("/update", verifyrest, (req, res) => {
    mysqlConnection.query(
        "UPDATE employee set Name = ?,EmpCode = ?, Salary = ? WHERE EMPID= ?",
        [req.body.Name, req.body.EmpCode, req.body.Salary, req.params.id], (err, rows, fields) => {
            !err ? res.json(rows) : res.json({message: err});
        }
    );
});


  
//Delete using form
router.get("/delete", verify, (req, res) => {
    mysqlConnection.query(
        "DELETE FROM employee WHERE EmpID = ?", [req.params.id], (err, rows, fields) => {
            !err ? res.redirect("/view") : console.log(err);
        }
    );
});

//Delete using endpoint api
router.delete("/delete", verifyrest, (req, res) => {
    mysqlConnection.query(
        "DELETE FROM employee WHERE EmpID = ?", [req.params.id], (err, rows, fields) => {
            !err ? res.json(rows) : res.json({message: err});
        }
    );
});

module.exports = router;