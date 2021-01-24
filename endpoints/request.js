import axios from "axios";
import SETTINGS from "../config/settings";

const request = axios.create({
  baseURL: SETTINGS.apiRoot,
})

request.interceptors.request.use(function (config) {
  config.headers.teamId = SETTINGS.token() ?? null;
  return config;
})

export default request
