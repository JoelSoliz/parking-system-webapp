const HOST = 'https://parking-system-api-production-f442.up.railway.app'

export const getReservationsAsync = async (page, token) => {
  const apiURL = `${HOST}/reservation/?current_page=${page}`
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
