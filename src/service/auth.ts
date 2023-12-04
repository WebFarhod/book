import { getItem } from '../helpers/storage';
import axios from './api';
import CryptoJS from 'crypto-js';

interface singUpBody {
    name: string | null;
    email: string;
    key: string | null;
    secret: string;
}

interface singInBody {
    email: string;
    secret: string;
}

interface AuthService {
    userSignUp: (body: singUpBody) => Promise<any>;
    userSignIn: (body: singInBody) => Promise<any>;
    getUser: () => Promise<any>;
}

const authService: AuthService = {
    async userSignUp(body: singUpBody) {

        const response = await axios.post('/signup', body, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    },

    async userSignIn(body: singInBody) {
        const signstr = 'GET' + '/myself' + body.secret
        const sign = CryptoJS.MD5(signstr).toString();

        const response = await axios.get('/myself', {
            headers: {
                'Content-Type': 'application/json',
                'Key': `${body.secret}`,
                'Sign': `${sign}`
            }
        });
        return response;
    },

    async getUser() {
        const sign = getItem('Sign')
        const key = getItem('Key')
        
        const response = await axios.get('/myself', {
            headers: {
                'Content-Type': 'application/json',
                'Key': `${key}`,
                'Sign': `${sign}`
            }
        });
        return response.data;
    },
};

export default authService;
