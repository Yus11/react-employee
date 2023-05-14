const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')
const { getAllEmployees, getEmployee, addEmployee, editEmployee, removeEmployee } = require("../controllers/employees");

router.get("/", auth, getAllEmployees)

router.get("/:id", auth, getEmployee)

router.post("/add", auth, addEmployee)

router.put("/:id", auth, editEmployee)

router.delete("/:id", auth, removeEmployee)

module.exports = router;