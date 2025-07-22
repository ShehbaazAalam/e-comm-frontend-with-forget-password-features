import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/shopContext';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const navigate = useNavigate();
  const { setToken } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const saveUserToStorage = (userObj) => {
    localStorage.setItem(`user_${userObj.email}`, JSON.stringify(userObj));
  };

  const getUserFromStorage = (email) => {
    const userStr = localStorage.getItem(`user_${email}`);
    return userStr ? JSON.parse(userStr) : null;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!email || !password || (currentState === 'Sign Up' && !name)) {
      toast.error('Please fill all fields');
      return;
    }

    const existingUser = getUserFromStorage(email);

    if (currentState === 'Sign Up') {
      if (existingUser) {
        toast.error('User already exists! Please log in.');
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = { name, email, password: hashedPassword };
        saveUserToStorage(newUser);

        const fakeToken = 'token_' + Date.now();
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('email', email);
        setToken(fakeToken);

        toast.success(`Welcome, ${name}! Account created.`);
        navigate('/');
      }
    } else {
      if (!existingUser) {
        toast.error('No account found. Please sign up.');
        return;
      }

      const isPasswordMatch = bcrypt.compareSync(password, existingUser.password);

      if (isPasswordMatch) {
        const userToken = 'token_' + Date.now();
        localStorage.setItem('token', userToken);
        localStorage.setItem('email', email);
        setToken(userToken);

        toast.success(`Welcome back, ${existingUser.name}!`);
        navigate('/');
      } else {
        toast.error('Incorrect email or password!');
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Sign Up' && (
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

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <a href='/forget'>Forget Password</a>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-blue-600 underline'>
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-blue-600 underline'>
            Login Here
          </p>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'} 
      </button>
    </form>
  );
};

export default Login;
