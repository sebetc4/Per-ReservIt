import axios, { AxiosInstance } from 'axios';
import { ObjectId } from 'mongoose';

class ApiService {
    api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/api',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'identity',
                'Content-type': 'application/json',
            },
        });
        // this.api.interceptors.response.use(
        //     (res: any) => {
        //         return res;
        //     },
        //     (err: any) => {
        //         if (err.response.data === 'Invalid token') {
        //             console.log(err);
        //         }
        //         return Promise.reject(err);
        //     }
        // );
    }
    // Properties
    fetchAllProperties() {
        return this.api.get('/properties');
    }
    fetchProperty(id: string) {
        return this.api.get(`/properties/${id}`);
    }
}

export default new ApiService();
