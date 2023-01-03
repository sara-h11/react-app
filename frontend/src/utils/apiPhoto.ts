import axios from "axios"
import { store } from "store";

export const apiPhoto = axios.create(
    {
        baseURL : "https://jsonplaceholder.typicode.com/",
        // baseURL : "http://localhost:3010"
    }
);
apiPhoto.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if(token && config.headers){
        config.headers['token'] = token;
    }
    return config;

})
