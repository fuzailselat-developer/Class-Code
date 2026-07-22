import { useEffect, useState } from "react"
import { BASE_URL } from "../constants/api"

const useFetch = (endPoint) => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setError(null)
    setLoading(true)
    try {

      const res = await fetch(
        BASE_URL + endPoint
      )

      const data = await res.json()
      setData(data)
      console.log(data)

    } catch (error) {
      console.log(error)

      if (!navigator.onLine) {
        setError('no internet connection.')
      }
      else {
        setError(error?.response?.data?.message || error.message)
      }
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endPoint])

  return { fetchData, loading, error, data }

}

export default useFetch