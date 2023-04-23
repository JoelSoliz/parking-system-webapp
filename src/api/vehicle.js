const HOST = 'https://parking-system-api-production-f442.up.railway.app'

export const registerVehicleAsync = async (vehicle) => {
  const apiURL = `${HOST}/vehicle/`

  return fetch(apiURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e)
      throw e
    })
}
