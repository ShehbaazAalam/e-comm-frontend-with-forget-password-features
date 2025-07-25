import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Contact from './pages/Contact';  
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from './pages/forgetPassword';
// import 'react-toastify/dist/React-Toastify.css';



const App = () => {
  return (
    <div className='px-14 sm-px-[5vw] md-px-[7vw] lg-px-[9vw]'>
    <ToastContainer/>
    <Navbar/>
    <Searchbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/place-order' element={<PlaceOrder/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/forget' element={<ForgotPassword/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App