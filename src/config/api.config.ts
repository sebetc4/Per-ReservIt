import axios, { AxiosInstance } from 'axios';

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
    fetchAllProperties(currentPage: string, location: string | null, type: string, guests: string | null) {
        let query = `/properties?page=${currentPage}&type=${type}`;
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
}

export default new ApiService();
