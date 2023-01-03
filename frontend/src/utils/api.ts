import { notification } from "antd";
import axios from "axios"
import { store } from "store";

export const api = axios.create(
    {
        // baseURL : "https://jsonplaceholder.typicode.com/",
        // baseURL : "http://localhost:3010"
        baseURL : process.env.REACT_APP_API
    }
);
api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if(token && config.headers){
        config.headers['token'] = token;
    }
    return config;

});
api.interceptors.response.use((response) =>  response, (error) =>
 {
        if (error.response && error.response.data){
            notification.error({
                message:error.response.data.error})
        }else {
            notification.error({
                message:error.message
        })
    }
    console.log(error);
    return Promise.reject(error);
  });
