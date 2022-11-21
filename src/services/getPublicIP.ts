export async function getPublicIP () {
  return await window.fetch('https://api.db-ip.com/v2/free/self')
    .then(response => response.json())
    .then(({ ipAddress, countryName, stateProv }) => `${ipAddress} -- ${countryName}, ${stateProv}`)
    .catch(() => 'Algo salio mal!')
}
