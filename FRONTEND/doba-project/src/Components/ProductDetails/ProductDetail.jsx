import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { mainURL, userURL } from '../../Base/Constent';

// imported images
import texture_3 from '../../../assets/images/texture-2.jpg'


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details using the productId `${adminbaseURL}/allproducts`
    axios.get(`${userURL}/product/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
      window.scrollTo(0,0);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display product details */}
      <div className="lg:h-[200px] md:h-[150px] h-[100px] bg-contain text-white font-bold text-center flex justify-center items-center lg:text-[3rem] md:text-[2rem] text-[1.5rem]" style={{backgroundImage:`url(${texture_3})`}}>
        <span>PRODUCT NAME: {product.productName}</span>
      </div>
      {/*  */}
      <div className="sm:flex w-[100%]  justify-center items-center my-10">
            <div className="sm:grid sm:grid-cols-3 sm:w-[55rem] w-[100%]">
                <div className="border m-2 object-cover">
                        <img src={`${mainURL}/Public/ProductsImages/${product.file}`} alt={product.productName} 
                        className='p-3' />
                </div>
                <div className="col-span-2 mx-5 text-[1.1rem]">
                <h2>{product.productName}</h2>
                        <p>Price: ₹{product.price}</p>
                        <p>{product.description}</p>
                </div>

            </div>
      </div>
            
      {/* Add more details as needed */}
    </div>
  );
}

export { ProductDetail };  // Exporting ProductDetail as a named export
