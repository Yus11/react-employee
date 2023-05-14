const { prisma } = require('../prisma/prisma-client');

/**
* @route GET api/employees
* @desc Get all employees list
* @access Private
**/
async function getAllEmployees (req, res) {
  try {
    const employees = await prisma.employee.findMany()

    res.status(200).json(employees)
  } catch {
    res.status(500).json({ message: "Не удалось получить сотрудников" })
  }
}

/**
 * @route POST api/employees/add
 * @desc Add new employee
 * @access Private
 **/
async function addEmployee (req, res) {
  try {
    const { firstName, lastName, address, age  } = req.body

    if (!firstName || !lastName || !address || !age) {
      return res.status(400).json({ message: "Все поля обязательные" })
    }

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        address,
        age,
        userId: req.user.id
      }
    })

    return res.status(201).json(employee)

  } catch {
    res.status(500).json({ message: "Не удалось добавить сотрудника" })
  }
}

/**
 * @route POST api/employees/:id
 * @desc Remove an employee
 * @access Private
 **/
async function removeEmployee (req, res) {
  try {
    const { id  } = req.body

    if (!id) {
      return res.status(400).json({ message: "Поле id обязательное" })
    }

    await prisma.employee.delete({
      where: {
        id
      }
    })

    return res.status(200).json({ message: "Сотрудник успешно удален" })

  } catch {
    res.status(500).json({ message: "Не удалось удалить сотрудника" })
  }
}

/**
 * @route PUT api/employees/:id
 * @desc Edit an employee
 * @access Private
 **/
async function editEmployee (req, res) {
  try {
    const { id, firstName, lastName, address, age  } = req.body

    if (!firstName || !lastName || !address || !age) {
      return res.status(400).json({ message: "Все поля обязательные" })
    }

    await prisma.employee.update({
      where: {
        id
      },
      data: {
        firstName, lastName, address, age
      }
    })

    return res.status(204).json({ message: "Сотрудник успешно отредактирован" })

  } catch {
    res.status(500).json({ message: "Не удалось редактировать сотрудника" })
  }
}

/**
 * @route GET api/employees/:id
 * @desc Get an employee
 * @access Private
 **/
async function getEmployee (req, res) {
  try {
    const { id } = req.params


    const employee = await prisma.employee.findUnique({
      where: {
        id
      }
    })

    return res.status(200).json(employee)

  } catch {
    res.status(500).json({ message: "Не удалось получить сотрудника" })
  }
}

module.exports = {
  getAllEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getEmployee
}