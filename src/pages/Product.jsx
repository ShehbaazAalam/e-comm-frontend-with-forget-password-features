import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/shopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0]);
       


        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*-------------------------------- {Product Data} -------------------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*----------------------------- {Product Images} ------------------------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row justify-center items-center '>

          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt=""></img>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/*------------------------- {Product Info}---------------------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2x mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delovery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*------------------- Description And Review Section-------------------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='h-10 border px-5 text-sm'>Description</b>
          <p className='h-10 border px-5 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
        <p>An e-commerce website is an online platform where businesses sell products or services to customers. It provides features like product catalogs, search filters, secure payment gateways, and user reviews, enabling a seamless shopping experience. Customers can browse, compare, and purchase conveniently from any location.</p>
        <p>Additionally, these platforms streamline order management, inventory tracking, and delivery processes while offering personalized recommendations and discounts. E-commerce websites play a crucial role in modern trade, making shopping accessible, efficient, and tailored to individual preferences in the digital era.</p>

        </div>
      </div>
      {/*-------------------display related Products--------------------*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product