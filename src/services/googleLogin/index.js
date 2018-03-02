const GOOGLE_YOLO_CONFIGURATION = {
  supportedAuthMethods: [
    'https://accounts.google.com'
  ],
  supportedIdTokenProviders: [
    {
      uri: 'https://accounts.google.com',
      clientId: '627854783760-thjum3jd8ulc08244o9211au5aqq4ar3.apps.googleusercontent.com'
    }
  ]
}

let googleLogin = isMock => {
  if (isMock) {
    return Promise.resolve({email: 'mock'})
  } else {
    return googleyolo.retrieve(GOOGLE_YOLO_CONFIGURATION)
    .then(login => login, error => {
      if (error.type === 'noCredentialsAvailable'){
        return googleyolo.hint(GOOGLE_YOLO_CONFIGURATION)
      }
    })
  }
}

export default googleLogin