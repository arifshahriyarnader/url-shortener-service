import axios from "axios";
import { appConfig } from "../config";

export const https = axios.create({
    baseURL: appConfig.BASE_URL,
    headers:{
        "Content-Type":"application/json",
    },
})