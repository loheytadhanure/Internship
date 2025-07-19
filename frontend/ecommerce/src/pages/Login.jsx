// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';



// const Login = () => {
//   const [currentState, setCurrentState] = useState('login');
//   const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (currentState === 'signup') {
//         const response = await axios.post(`${backendUrl}/api/user/register`, {
//           name,
//           email,
//           password,
//         });

//         if (response.data.success) {
//           const { token, user } = response.data;

//           setToken(token);
//           localStorage.setItem('token', token);
//           localStorage.setItem('userId', user._id); // ✅ Save user ID

//           toast.success("Sign Up Successful!");
//           navigate('/'); // ✅ Redirect to home after signup
//         } else {
//           toast.error(response.data.message || "Signup failed");
//         }
//       } else {
//         const response = await axios.post(`${backendUrl}/api/user/login`, {
//           email,
//           password,
//         });

//         if (response.data.success) {
//           const { token, user } = response.data;

//           setToken(token);
//           localStorage.setItem('token', token);
//           localStorage.setItem('userId', user._id); // ✅ Save user ID
//           // localStorage.setItem('userId', response.data.userId);
//           setToken(tokenFromBackend);
//           setUserId(response.data.userId);

//           toast.success("Login Successful!");
//           navigate('/'); // ✅ Redirect to home after login
//         } else {
//           toast.error(response.data.message || "Invalid credentials");
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || error.message || "Something went wrong");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
//     >
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl capitalize'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
//       </div>

//       {currentState === 'signup' && (
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           type='text'
//           className='w-full px-3 py-2 border border-gray-800'
//           placeholder='Name'
//           required
//         />
//       )}

//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         type='email'
//         className='w-full px-3 py-2 border border-gray-800'
//         placeholder='Email'
//         required
//       />

//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         type='password'
//         className='w-full px-3 py-2 border border-gray-800'
//         placeholder='Password'
//         required
//       />

//       <div className='w-full flex justify-between text-sm mt-[8px]'>
//         <p className='cursor-pointer'>Forgot your password?</p>
//         <p
//           onClick={() =>
//             setCurrentState((prev) => (prev === 'login' ? 'signup' : 'login'))
//           }
//           className='cursor-pointer'
//         >
//           {currentState === 'login' ? 'Create Account' : 'Login Here'}
//         </p>
//       </div>

//       <button className='bg-black text-white font-light px-8 py-2 mt-4'>
//         {currentState === 'login' ? 'Sign In' : 'Sign Up'}
//       </button>
//     </form>
//   );
// };

// export default Login;



import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { setToken, backendUrl, navigate } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'signup') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          const { token, user } = response.data;

          setToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', user._id);

          toast.success("Sign Up Successful!");
          navigate('/');
        } else {
          toast.error(response.data.message || "Signup failed");
        }
      } else {
        // LOGIN
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          const { token, user } = response.data;

          // ✅ Use token from response
          setToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', user._id);

          toast.success("Login Successful!");
          navigate('/');
        } else {
          toast.error(response.data.message || "Invalid credentials");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl capitalize'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
      </div>

      {currentState === 'signup' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p
          onClick={() =>
            setCurrentState((prev) => (prev === 'login' ? 'signup' : 'login'))
          }
          className='cursor-pointer'
        >
          {currentState === 'login' ? 'Create Account' : 'Login Here'}
        </p>
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
