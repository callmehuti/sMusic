import axios, { InternalAxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

//Xử lí trước khi call api
instance.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      req.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return req
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
// profile => 401 => refreshToken => profile
// Xử lí sau khi nhận response
instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    const config = error.config
    console.log(config)
    if (config.retry) {
      //redirect to login
      window.location.href = '/login'
      return
    }
    // 401 => accessToken sai or accessToken hết hạn(5m)
    if (error.response.status === 401) {
      config.retry = true
      localStorage.removeItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        window.location.href = '/login'
        return
      }

      // call api refreshToken
      const res = await instance.post('/user/refreshToken', { refreshToken })
      localStorage.setItem('accessToken', res.data.accessToken)
      return instance(config)
    }
    return Promise.reject(error)
  }
)

export default instance
