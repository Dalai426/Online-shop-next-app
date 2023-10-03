"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [loading, setLoading] = useState(null);
  const [del,setDel]=useState(true);

  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {

    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      if (data?.user) {
        router.push("/");
      }

    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress=async (address)=>{
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/address`,
        address
      );

      if (data) {
        router.push("/me");
      }

    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }


  const updateAddress=async (id, address)=>{
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/address/${id}`,
        address
      );

      if (data?.address) {
        setUpdated(false);
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }


  
  const deleteAddress=async (id)=>{
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/address/${id}`
      );

      if (data?.success) {
        setDel(current=>!current);
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  const updateProfile=async (formData)=>{
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/me`,
        formData,
        {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
      );

      console.log("da",data);

      if (data?.user) {
        loadUser();
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  }


  const loadUser = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/auth/session?update");

      if (data?.user) {
        setUser(data.user);
        router.replace("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };


  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        updated,
        setUser,
        registerUser,
        clearError,
        addNewAddress,
        updateAddress,
        setUpdated,
        deleteAddress,
        updateProfile,  
        del
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;