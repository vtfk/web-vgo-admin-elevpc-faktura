module.exports = {
  adal: {
    // 'common' (multi-tenant gateway) or Azure AD Tenant ID
    tenant: process.env.VUE_APP_TENANT_ID || '<guid>',

    // Application ID
    clientId: process.env.VUE_APP_CLIENT_ID || '<guid>',

    // Host URI
    redirectUri: process.env.VUE_APP_REDIRECT_URL || '<host addr>',

    // Cache Location
    cacheLocation: 'localStorage'
  },
  // Students API base URL
  studentsApiUrl: process.env.STUDENTS_API_URL || 'https://samtykker.api.minelev.no',
  theme: {
    primary: process.env.COLOR_PRIMARY || '#000000',
    secondary: process.env.COLOR_SECONDARY || '#ffd520',
    accent: process.env.COLOR_ACCENT || '#6ac4ae',
    error: process.env.COLOR_ERROR || '#e30438',
    info: process.env.COLOR_INFO || '#00b1c7',
    success: process.env.COLOR_SUCCESS || '#4CAF50',
    warning: process.env.COLOR_WARNING || '#FFC107'
  }
}
