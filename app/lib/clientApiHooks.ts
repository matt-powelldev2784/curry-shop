import { useState } from 'react'

type PostRequestArgs = {
  url: string
  body: unknown
}

type GetRequestArgs = {
  url: string
}

type UsePostRequestReturn<T> = {
  postRequest: (args: PostRequestArgs) => Promise<void>
  data?: T
  error?: string
  isLoading: boolean
}

type UseGetRequestReturn<T> = {
  getRequest: (args: GetRequestArgs) => Promise<void>
  data?: T
  error?: string
  isLoading: boolean
}

export const usePostRequest = <T>(): UsePostRequestReturn<T> => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const postRequest = async ({ url, body }: PostRequestArgs) => {
    setIsLoading(true)
    setError(undefined)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.error) {
        return setError(data.error || 'Error posting data')
      }

      setData(data)
    } catch (error) {
      console.log('error in use post request', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { postRequest, data, error, isLoading }
}

export const useGetRequest = <T>(): UseGetRequestReturn<T> => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getRequest = async ({ url }: GetRequestArgs) => {
    setIsLoading(true)
    setError(undefined)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.error) {
        return setError(data.error || 'Error fetching data')
      }

      setData(data)
    } catch (error) {
      console.log('error in use get request', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { getRequest, data, error, isLoading }
}
