import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

let users = [
  {
    id: 1,
    name: "Ali"
  },
  {
    id: 2,
    name: "Ahmed"
  },
  {
    id: 3,
    name: "Sara"
  },
  {
    id: 4,
    name: "Fatima"
  },
  {
    id: 5,
    name: "Zain"
  },
];

export default users;

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome back!"
  })
})

app.get('/api/users', (req, res) => {
  try {
    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users available",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {
    console.log("GET USERS ERR:", error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }

})

app.post('/api/users/add', (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required.",
        success: false
      })
    }

    const { name } = req.body

    if (!name?.trim()) {
      return res.status(400).json({
        message: "name is required.",
        success: false
      })
    }

    const userExists = users.some((user) => user.name == name)

    if (userExists) {
      return res.status(409).json({
        message: "user with this name already exist.",
        success: false
      })
    }

    const cloneUsers = [...users]
    const newUser = {
      id: cloneUsers.length + 1,
      name
    }
    cloneUsers.push(newUser)
    users = cloneUsers

    res.status(201).json({
      message: "User created successfully.",
      success: true,
      data: users
    })


  } catch (error) {
    console.log('POST USER ERR:', error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
})

app.delete('/api/users/delete/:key', (req, res) => {
  try {

    const { key } = req.params

    if (isNaN(key) || key < 0 || key >= users.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid user index"
      });
    }

    const cloneUsers = [...users]
    cloneUsers.splice(key, 1)
    users = cloneUsers

    res.status(200).json({
      message: "User deleted successfully.",
      success: true,
      data: users
    })

  } catch (error) {
    console.log('DELETE USER ERR:', error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }


})

app.put('/api/users/update/:key', (req, res) => {
  try {

    const { key } = req.params
    const { name } = req.body

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required.",
        success: false
      })
    }

    if (!name?.trim()) {
      return res.status(400).json({
        message: "name is required.",
        success: false
      })
    }


    if (isNaN(key) || key < 0 || key >= users.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid user index"
      });
    }

    const updateUser = users[key]
    updateUser.name = name

    const cloneUsers = [...users]
    cloneUsers.splice(key, 1, updateUser)
    users = cloneUsers

    res.status(200).json({
      message: "User updated successfully.",
      success: true
    })

  } catch (error) {
    console.log('DELETE USER ERR:', error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }


})

app.delete('/api/users/delete-all', (req, res) => {
  try {

    users = []

    res.status(200).json({
      message: "Users deleted successfully.",
      success: true
    })

  } catch (error) {
    console.log('DELETE USER ERR:', error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }


})

const PORT = process.env.PORT || 2000
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})