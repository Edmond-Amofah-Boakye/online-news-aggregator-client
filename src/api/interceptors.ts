import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json"
    },
    // timeout: 2000
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token")
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
}, (error)=> {
    return Promise.reject(error)
}) 




axiosInstance.interceptors.response.use((response)=> {
    return response
}, async(error) => {
    const originalRequest = error.config

    if(error.response && error.response?.status == 403 && !originalRequest._retry){
        originalRequest._retry = true
        try {
            const refreshToken = localStorage.getItem('refresh_token')
            const results = await axiosInstance.post('/auth/refresh_token', {token: refreshToken})
            const {access_token: newAccessToken, refresh_token: newRefreshToken} = results.data
            
            //set new tokens to localstorage
            localStorage.setItem("access_token", newAccessToken)
            localStorage.setItem("refresh_token", newRefreshToken)

            //attach token to request
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosInstance(originalRequest) //retry the whole request again
            
        } catch (refreshError) {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            window.location.href = "/signin"
            console.log(refreshError)
            return Promise.reject(refreshError)
        }
    }
    return Promise.reject(error)
})


