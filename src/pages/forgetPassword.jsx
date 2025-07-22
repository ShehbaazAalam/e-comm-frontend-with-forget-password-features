import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbzczARkNU2T5MosIzCcXmtmS1FlTj7pLdkDwMhE5nIWihtViYdjzhdGXMXwQpcqUR0_yw/exec'; // Must be full URL

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.email !== email) {
      alert('User not found with this email');
      return;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    alert(`OTP sent to email (simulated): ${generatedOtp}`);
  };

  const resetPassword = async () => {
    if (otp !== enteredOtp) {
      alert('Incorrect OTP');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.password = hashedPassword;
    localStorage.setItem('user', JSON.stringify(user));

    setLoading(true);
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          newPassword: hashedPassword,
          resetTime: new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.log('Google Sheets error:', err);
    }

    setLoading(false);
    alert('Password reset successful!');
    navigate('/login');
  };

  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-4'>
        <p className='text-3xl font-semibold'>Forgot Password</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      <input
        type='email'
        placeholder='Enter your registered email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full px-3 py-2 border border-gray-800'
        required
      />

      {!otpSent ? (
        <button
          type='button'
          onClick={sendOtp}
          className='bg-black text-white px-8 py-2 mt-2 w-full'
        >
          Send OTP
        </button>
      ) : (
        <>
          <input
            type='text'
            placeholder='Enter OTP'
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800'
            required
          />
          <p className='text-xs text-gray-500 -mt-2 mb-2'>
            * OTP is shown above for simulation only
          </p>

          <input
            type='password'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800'
            required
          />

          <button
            type='button'
            onClick={resetPassword}
            disabled={loading}
            className='bg-black text-white px-8 py-2 w-full disabled:opacity-50'
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </>
      )}

      <p
        className='text-sm mt-4 text-blue-600 underline cursor-pointer'
        onClick={() => navigate('/login')}
      >
        Back to Login
      </p>
    </form>
  );
};

export default ForgetPassword;
