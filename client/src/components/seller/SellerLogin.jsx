import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  // Hardcoded credentials
  const [email] = useState("admin@example.com");
  const [password] = useState("bhavya123");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/seller/login', { email, password });
      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
        <p className='text-2xl font-medium m-auto'>
          <span className='text-primary'>Seller </span>Login
        </p>

        <div className='w-full'>
          <p>Email</p>
          <input
            value={email}
            type='email'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary bg-gray-100 cursor-not-allowed'
            disabled
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            value={password}
            type='password'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary bg-gray-100 cursor-not-allowed'
            disabled
          />
        </div>

        <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>
          Login
        </button>
      </div>
    </form>
  )
}

export default SellerLogin;
