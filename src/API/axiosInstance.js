import axios from "axios";
import { BASE_URL } from "./constatnt";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "custom-header": "axios_instance_header_test",
      },
})

export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
      "Content-type": "application/json; charset=UTF-8",
    "custom-header": "axios_private_instance_header_test",
    "Authorization": "Basic YWxhZGRpbjpvcGVuc2VzYW1l"
    },
})