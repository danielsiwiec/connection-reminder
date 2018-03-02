let loadFeatures = () => {
  return fetch('/features')
    .then(response => {
      if (response.status == 200) {
        return response.json()
      } else {
        throw new Error("Error fetching contacts")
      }
    }) 
}

let fetchUserData = (idToken) => {
  return fetch(`/contacts?token=${idToken}`)
    .then(response => {
      if (response.status == 200) {
        return response.json()
      } else {
        throw new Error("Error fetching contacts")
      }
    })
}

let syncWithBackend = (idToken, contacts) => {
  return fetch(`/contacts?token=${idToken}`,{
    method: 'POST',
    body: JSON.stringify({contacts}),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => {
    if (response.status != 200) {
      throw new Error("Sync error")
    }
  })
}

export default {loadFeatures, fetchUserData, syncWithBackend}