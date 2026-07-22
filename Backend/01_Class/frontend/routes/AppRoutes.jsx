import React from 'react'
import { Route, Routes } from 'react-router'
import HomeScreen from '../pages/home/home'
import UsersScreen from '../pages/users/users'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />}/>
      <Route path='/users' element={<UsersScreen />}/>
    </Routes>
  )
}

export default AppRoutes