import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { ShopContext } from '../context/shopContext';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filerProducts,setFilerProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubcategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter((item)=>item !== e.target.value))
    }
    else{
      setCategory((prev) => [...prev,e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubcategory(prev=>prev.filter((item)=>item !== e.target.value))
    }
    else{
      setSubcategory((prev) => [...prev,e.target.value])
    }
  }


  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
      
    }

    if (subCategory.length>0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilerProducts(productCopy);
  }


  const sortProduct = () => {
    let fpCopy = filerProducts.slice();
    
    switch(sortType){
      case 'low-high':
        setFilerProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;

      case 'high-low':
      setFilerProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
      break;

      default:
        applyFilter();
        break;
        
    }
  }

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* {filter options}  */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex item-center cursor-poiner gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} `} src={assets.dropdown_icon} alt="" />
        </p>
        {/* {Catagory Filter} */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>

        {/* {SubCategory Filter} */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>

      </div>
      {/* {Right Side} */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* {Product Sort} */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by High to Low</option>
          </select>
        </div>
        {/* {Map Products} */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filerProducts.map((item,index)=>(
            <ProductItem key={index} name={item.name} id={item._id} image={item.image} price={item.price} />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Collection;