/* api 請求 */
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// 註冊
export const register = async (email, password, nickname) => {
  return api.post('/users/sign_up', {
    email,
    password,
    nickname,
  })
}
