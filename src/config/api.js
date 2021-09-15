import { notification } from 'antd'
import axios from 'axios'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: 'http://localhost:8080',
    headers: { ...config.headers, 'X-Token': 'Test' },
  }
})
axiosInstance.interceptors.response.use(
  (response) => {
    const newResponse = { ...response, responseKu: response.data }
    return newResponse
  },
  (error) => {
    const { status } = error.response || {}
    console.log(`${error.config.method} - ${error.config.url}`)
    if (status === 404) {
      notification.error({ message: `API resource can't be found` })
    } else if (status === 500) {
      notification.error({ message: 'Internal Server Error' })
    } else if (status === 401) {
      notification.error({ message: 'You have to relogin.' })
    }
    return Promise.reject(error)
  }
)

export { axiosInstance }
