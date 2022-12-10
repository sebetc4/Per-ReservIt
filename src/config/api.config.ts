import axios, { AxiosInstance } from 'axios';
import { ISignUpBody } from '../types/request.types';

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
    }
    // Properties
    fetchAllProperties(currentPage: string, location: string | null, category: string, guests: string | null) {
        let query = `/properties?page=${currentPage}&category=${category}`;
        if (location) {
            query = query.concat(`&location=${location}`);
        }
        if (guests) {
            query = query.concat(`&guests=${guests}`);
        }
        return this.api.get(query);
    }
    fetchProperty(id: string) {
        return this.api.get(`/properties/${id}`);
    }
    // User
    signUp(data: ISignUpBody) {
        return this.api.post('/auth/signup', data);
    }
    fetchCurrentUserData() {
        return this.api.get('/auth/user');
    }
}

export const api = new ApiService();
