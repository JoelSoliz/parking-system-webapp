const HOST = 'https://parking-system-api-production.up.railway.app/'

export const getUserInfoAsync = async (token) => {
  const apiURL = `${HOST}/me`
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

export const loginAsync = async (user) => {
  const apiURL = `${HOST}/auth/login`
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
