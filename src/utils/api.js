/* api 請求 */
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

//Axios 攔截器(request)
api.interceptors.request.use((config) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/, //vue3-todolist-token 為 LoginView中設定的cookie
    '$1',
  )
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 註冊
export const register = async (email, password, nickname) => {
  return api.post('/users/sign_up', {
    email,
    password,
    nickname,
  })
}

// 登入
export const login = async (email, password) => {
  return api.post('/users/sign_in', {
    email,
    password,
  })
}

//使用者驗證

export const checkout = async () => {
  return api.get('/users/checkout')
}

// 登出

export const logout = async () => {}

// 取得代辦清單
export const get_todos = async () => {
  return api.get('/users/checkout', {})
}

// 新增待辦事項

// 更新待辦事項

// 刪除待辦事項

// 切換待辦事項完成狀態
