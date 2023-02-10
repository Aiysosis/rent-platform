//axios.js
import axios from "axios";
import store from "../../store";
import router from "../../router";

const BASE_URL = "http://localhost:1234";

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  timeout: 8000, // request timeout
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});
//request拦截器
service.interceptors.request.use((config) => {
  //判断是否存在token，如果存在的话，则每个http header都加上token
  if (store.state.token) {
    config.headers.Authorization = `Bearer ${store.state.token}`;
  }
  return config;
});

export default service;
