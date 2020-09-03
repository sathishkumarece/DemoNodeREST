//Importing required dependency modules
const express = require('express')

//Importing required dependency modules - Application specific
const Employee = require('../models/employee-model')

//Creating routing instance
const router = express.Router()

//Get all employees
router.get('/', (req, res, next) => {
  Employee.findAll(function (err, employee) {
    console.log('controller')
    if (err) {
      res.send(err)
    }
    console.log('res', employee)
    res.send(employee)
  })
})

// Create a new employee
router.post('/', (req, res, next) => {
  const new_employee = new Employee(req.body)
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400)
      .send({ error: true, message: 'Please provide all required field' })
  } else {
    Employee.create(new_employee, function (err, employee) {
      if (err) {
        res.send(err);
      } 
      res.json({
        error: false,
        message: 'Employee added successfully!',
        data: employee,
      })
    })
  }
})

// Retrieve a single employee with id
router.get('/:id', (req, res, next) => {
    Employee.findById(req.params.id, function(err, employee) {
        if (err){
            res.send(err);
        }
        res.json(employee);
      });
})

// Update a employee with id
router.put('/:id', (req, res, next) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
      }else{
        Employee.update(req.params.id, new Employee(req.body), function(err, employee) {
       if (err){
           res.send(err);
       }
       res.json({ error:false, message: 'Employee successfully updated' });
    });
    }
})

// Delete a employee with id
router.delete('/:id', (req, res, next) => {
    Employee.delete( req.params.id, function(err, employee) {
        if (err){
            res.send(err);
        }
        res.json({ error:false, message: 'Employee successfully deleted' });
      });
})

//Exporting router as module
module.exports = router
