 
import Profile from '@/components/auth/Profile'
import axios from 'axios'
import { cookies } from "next/dist/client/components/headers";


const getAddresses=async ()=>{

const cooks = cookies();
const nextAuthSessionToken = cooks.get("next-auth.session-token");

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });
  return data?.addresses;
}


const page = async () => {

  const addresses=await getAddresses();  


  return (
    <Profile addresses={addresses}/>
  )
}

export default page