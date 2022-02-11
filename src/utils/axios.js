import axios from 'axios'
// import { ElMessage } from 'element-plus'
// import router from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.API_ROOT : '';
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

axios.interceptors.request.use(function (config) {
    // 启动进度条
    NProgress.start()
    // ElMessage.success({
    //     message: '成功',
    //     type: 'success'
    //   });
    return config
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
    })

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done()
    return response;
    }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
    });


export default axios