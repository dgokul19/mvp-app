import Axios from 'axios';


export const callApiHelper = async (
    serviceEndpoint,
    params,
    requestMethod,
    requestBody,
) => {
    const axiosInstance = Axios.create({
        baseURL: 'https://nphc-hr.free.beeceptor.com',
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
