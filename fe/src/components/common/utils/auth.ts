// // utils/auth.ts
// export const checkAuth = async (): Promise<boolean> => {
//   const token = localStorage.getItem('token')
//   if (!token) return false

//   try {
//     const baseUrl = import.meta.env.VITE_API_BASE_URL

//     const response = await fetch(`${baseUrl}/auth/check`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })

//     if (response.ok) {
//       const data = await response.json()
//       return data.authenticated === true
//     } else {
//       return false
//     }
//   } catch (error) {
//     console.error('Auth check failed', error)
//     return false
//   }
// }
// ============================================================= pengecekan hanya di fe
export const checkAuth = async (): Promise<boolean> => {
  const token = localStorage.getItem('token')
  return Promise.resolve(!!token)
}
