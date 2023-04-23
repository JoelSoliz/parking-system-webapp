const HOST = 'https://parking-system-api-production-f442.up.railway.app'

export const getUserByIdInfoAsync = async (id, token) => {
  const apiURL = `${HOST}/customer/${id}`
  return fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e)
      throw e
    })
}

export const getUsersInfoAsync = async (page, token) => {
  const apiURL = `${HOST}/customer/?current_page=${page}`
  return fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e)
      throw e
    })
}

export const registerUserAsync = async (user) => {
  delete user['passwordConfirmation']
  const apiURL = `${HOST}/customer/`

  return fetch(apiURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e)
      throw e
    })
}
