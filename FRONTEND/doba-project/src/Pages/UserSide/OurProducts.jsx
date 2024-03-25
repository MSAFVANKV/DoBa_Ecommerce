import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsHome } from "../../ReduxToolKit/Admin/ProductsSlice";
import { mainURL } from "../../Base/Constent";
import { Link } from "react-router-dom";

function OurProducts() {
  const dispatch = useDispatch();

  const getProductSlice = useSelector((state) => state.products?.products);
  useEffect(() => {
    dispatch(getProductsHome());
  }, [dispatch]);

  return (
    <>
    
      {getProductSlice?.length > 0 && (
       <>
       <h2 className="text-center  sm:text-[2rem] text-[1.5rem] font-bold select-none">
              OUR PRODUCTS
            </h2>
       <div className='flex flex-col sm:flex-row flex-wrap  gap-8 items-center justify-around my-24'>
       {
           getProductSlice.map((item,index) => (
            <Link to={`/product/${item._id}`} key={item._id}>
                 <div className="shadow-2xl rounded-md bg-white py-6 w-[20rem] px-5 mx-auto text-center cursor-pointer 
               hover:translate-y-4 duration-300 transition-all" key={item.id}>
                   <div className="flex w-full mx-auto items-center justify-center">
                       <img  src={`${mainURL}/Public/ProductsImages/${item.file[0]}`}  alt={item.productName} className='bg-main p-2 rounded-full w-28 h-28'/>
                   </div>
                   <div className='mt-5 space-y-1 '>
                       <h3>{item.productName}</h3>
                       <p>{item.des}</p>
                   </div>
               </div>
            </Link>
              
           ))
       }
   </div>
   {/* store buton */}
   <div className="relative flex justify-center  overflow-hidde ">
          <div className="absolute inset-0 bg-center"></div>
          <div className="">
            <div className="flex py-5">
              <Link to={`/products`}>
                <button
                  className="relative border-2 border-[#F26D1E] bg-transparent py-2.5 px-10 sm:px-14 md:px-16 font-medium uppercase text-black
       transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full
       before:w-full before:origin-top-left before:scale-x-0 before:bg-[#F26D1E] before:transition-transform
        before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
                >
                  Take to store
                </button>
              </Link>
            </div>
          </div>
          
        </div>
       </> 
       
      )}
    </>
  );
}

export default OurProducts;
