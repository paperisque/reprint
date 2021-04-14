import axios from "axios";

const base:string = process.env?.NODE_ENV==='development'?'/api':''

axios.defaults.withCredentials = true;

const api = axios.create({ baseURL: base });

//console.log(process.env);

export default api;