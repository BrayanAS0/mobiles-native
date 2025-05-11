

import axios, { AxiosRequestConfig } from "axios";

const LOCAL_URL = "http://10.0.2.2:5285/"; //Simulador android
const ONLINE_URL = "https://prueba-mobiles-git-brayan3312-dev.apps.rm1.0a51.p1.openshiftapps.com/"; // Servidor global

const tryRequest = async (method: string, endpoint: string, data?: any, options: AxiosRequestConfig = {}) => {
    try {
        const response = await axios({
            method,
            url: `${ONLINE_URL}${endpoint}`,
            data,
            ...options,
        });
        console.log(`✅ ${method} desde GLOBAL:`, response.data);
        return response.data;
    } catch (globalError) {
        console.warn(`🌐 ${method} en GLOBAL falló, intentando LOCAL...`);

        try {
            const response = await axios({
                method,
                url: `${LOCAL_URL}${endpoint}`,
                data,
                ...options,
            });
            console.log(`✅ ${method} desde LOCAL:`, response.data);
            return response.data;
        } catch (localError) {
            console.error(`❌ ${method} falló en GLOBAL y LOCAL.`);
            throw new Error("No se pudo conectar a ningún servidor.");
        }
    }
};

export const api = {
    get: (endpoint: string, options?: AxiosRequestConfig) => tryRequest("GET", endpoint, undefined, options),
    post: (endpoint: string, data: any, options?: AxiosRequestConfig) => tryRequest("POST", endpoint, data, options),
    put: (endpoint: string, data: any, options?: AxiosRequestConfig) => tryRequest("PUT", endpoint, data, options),
    del: (endpoint: string, options?: AxiosRequestConfig) => tryRequest("DELETE", endpoint, undefined, options),
};
