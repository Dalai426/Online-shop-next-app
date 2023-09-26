import {withAuth} from "next-auth/middleware";
export default withAuth(
    async function middleWare(req){
        //authorize role 
        
    });

export const config={
    matcher:["/me"]
};