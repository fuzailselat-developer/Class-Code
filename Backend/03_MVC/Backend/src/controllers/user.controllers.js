const users = [
  { id: 1, name: "fuzail" },
  { id: 2, name: "usman" },
  { id: 3, name: "raza" },
  { id: 4, name: "ali" }
]

const GetUsersControllers = (req, res) => {

  if (users.length == 0) {
    return res.status(404).json({
      success: false,
      message: "Users not found!"
    })
  }

  return res.status(200).json({
    success: true,
    message: "Users fetch successfully!",
    data: users
  })

}


export {
  GetUsersControllers
}