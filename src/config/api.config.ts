import axios, { AxiosInstance } from 'axios';
import { ObjectId } from 'mongoose';
import { SignUpBody, UpdateGeneralSettingsBody } from '../types/request.types';

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
    fetchOneProperty(_id: ObjectId) {
        return this.api.get(`/properties/${_id}`);
    }
    // User
    signUp(data: SignUpBody) {
        return this.api.post('/user', data);
    }
    fetchCurrentUserData() {
        return this.api.get('/user');
    }
    updateGeneralSettings(data: UpdateGeneralSettingsBody) {
        return this.api.put('/user/update/generalSettings', data);
    }
}

export const api = new ApiService();
