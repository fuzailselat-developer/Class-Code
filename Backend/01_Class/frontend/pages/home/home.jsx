import React from 'react'
import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'

const HomeScreen = () => {

  const { loading, data, error, fetchData } = useFetch('/')

  if (loading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>{error}...</p>
  }

  return (
    <div>
      <h1>Home Screen...!</h1>
      <Link to={'/users'}>
        Users
      </Link>

      <h1>
        {data.message}
      </h1>

    </div>
  )
}

export default HomeScreen