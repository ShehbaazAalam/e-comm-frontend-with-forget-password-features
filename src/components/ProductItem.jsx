import React, { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import {Link} from "react-router-dom";

const ProductItem = ({id,name,image,price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
    <div className='overflow-hidden'>
    <img className='hover:sale-110 transition ease-in-out' src={image[0]} alt="" />
    </div>
    <p className='pt-3 pb-1 text-sm'>{name}</p>
    <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem