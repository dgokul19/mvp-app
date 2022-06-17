import Axios from 'axios';
import { SERVER_URL } from './constants';


export const callApiHelper = async (
    serviceEndpoint,
    params,
    requestMethod,
    requestBody,
) => {
    const axiosInstance = Axios.create({
        baseURL: SERVER_URL.CONNECTION_URL,
    });

     axiosInstance.interceptors.request.use((request) => {
        request.headers = {
        'Content-Type': requestMethod !== 'POST' ? 'application/json' : "multipart/form-data",
        accept: 'application/json',
    };
        return request;
    });
    switch (requestMethod) {
        case 'GET':
            return axiosInstance
                .get(serviceEndpoint, { params })
                .then((response) => response)
                .catch((error) => {
                    throw error;
                });
        case 'POST':
            return axiosInstance
                .post(serviceEndpoint, requestBody)
                .then((response) => response)
                .catch((error) => {
                    throw error.response;
                });
        case 'PUT':
            return axiosInstance
                .put(serviceEndpoint, requestBody)
                .then((response) => response)
                .catch((error) => {
                    throw error.response;
                });
        case 'DELETE':
            return axiosInstance
                .delete(serviceEndpoint, { params })
                .then((response) => response)
                .catch((error) => {
                    throw error;
                });

        default:
            return '';
    }
};

export default callApiHelper;
