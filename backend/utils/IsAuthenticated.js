
import { getToken } from 'next-auth/jwt';


const IsAuthenticated = async (req) => {
    const token = await getToken({ req });
    if (!token) {
        return null; 
    }
    return token.user; 
}

export {IsAuthenticated}