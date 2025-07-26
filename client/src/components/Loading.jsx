import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {

    const {navigate, setCartItems,axios,user} = useAppContext();
    let {search} = useLocation();
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next');

    useEffect(()=>{
        const clearCart = async()=>{
            if(user){
                setCartItems({})
                await axios.post("/api/cart/update",{cartItems:{}})
            }
        }
        if(nextUrl){
            clearCart();
            setTimeout(()=>{
                navigate(`/${nextUrl}`)
            },5000)
        }
    },[user,nextUrl])

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300
        border-t-primary'></div>
    </div>
  )
}

export default Loading