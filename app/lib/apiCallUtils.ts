export async function getRequest<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Error fetching data')
  }

  return response.json()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postRequest<T>(url: string, body: any): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Error posting data')
  }

  return response.json()
}
