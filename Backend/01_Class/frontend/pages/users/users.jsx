import React from 'react'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router'

const UsersScreen = () => {

  const { fetchData, loading, error,data } = useFetch('/users')


  if (error) {
    return <p>{error}...</p>
  }

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <h1>UsersScreen....!</h1>
      <ul>
        {
          data?.data?.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))
        }
      </ul>

        <Link to={'/'}>
          Home
        </Link>

    </div>
  )
}

export default UsersScreen