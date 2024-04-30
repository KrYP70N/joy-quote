export const isLogin = () => {
  // Check if localStorage is supported
  if (typeof window !== 'undefined' && window.localStorage) {
    // Use localStorage
    return localStorage.getItem('token')
  } else {
    console.error('LocalStorage is not supported in this environment.');
  }
}