import axios, { AxiosInstance } from 'axios';
import { ObjectId } from 'mongoose';
import { SignUpBody, UpdateAccountBody, UpdatePasswordBody, UpdateProfileBody } from '../types/request.types';

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
        return this.api.post('/auth/signup', data);
    }
    fetchCurrentUserData() {
        return this.api.get('/user');
    }
    updateAccount(data: UpdateAccountBody) {
        return this.api.put('/user/update/account', data);
    }
    updateProfile(data: UpdateProfileBody) {
        return this.api.put('/user/update/profile', data);
    }
    updatePassword(data: UpdatePasswordBody) {
        return this.api.put('/user/update/password', data);
    }
}

export const api = new ApiService();
