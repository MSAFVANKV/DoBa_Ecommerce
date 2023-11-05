import React, { useState } from 'react';

import img from '../../../assets/images/doba_product_2.jpeg'
import {BsFillHeartFill} from 'react-icons/bs'

function Items() {

  const [likedItems, setLikedItems] = useState([]); 

  const home_Product_Cards = [
    {
      id: 1,
      name: "IDLY",
      image: img,
      price: 2000,
      offer: "20%",
    },
    {
      id: 2,
      name: "IDLY",
      image: img,
      price: 2000,
      offer: "20%",
    },
    {
      id: 3,
      name: "Dosa",
      image: img,
      price: 2000,
      offer: "20%",
    },
    {
      id: 4,
      name: "IDLY",
      image: img,
      price: 2000,
      offer: "20%",
    },
    {
      id: 5,
      name: "IDLY",
      image: img,
      price: 2000,
      offer: "20%",
    },
    {
      id: 6,
      name: "IDLY",
      image: img,
      price: 2000,
      offer: "20%",
    },
  ];
  const handleLikeClick = (itemId) => {
    if (likedItems.includes(itemId)) {
      // Unlike the item
      setLikedItems(likedItems.filter((id) => id !== itemId));
    } else {
      // Like the item
      setLikedItems([...likedItems, itemId]);
    }
  };
  return (
    <div className="">
        <h2 className='text-center text-[1.9rem] font-bold'>OUR PRODUCTS</h2>
    <div className='sm:flex hidden flex-wrap justify-center items-center'>
      {home_Product_Cards.map((item) => (
        <div className="container m-5 shadow-xl cursor-pointer" key={item.id} style={{ flexBasis: "20%" }}>
          <div className="bg-slate-500 p-1 rounded-lg text-center relative">
          <BsFillHeartFill size='2em'
                className={`absolute right-4 top-4 ${likedItems.includes(item.id) ? 'text-red-500' : 'text-white'}`}
                onClick={() => handleLikeClick(item.id)}
              />
            <img src={item.image} alt="" className='rounded-t-lg'/>
            <h3 className="text-white text-xl font-bold mb-2 text-center">{item.name}</h3>
            <p className="text-white text-lg mb-2">Price: ${item.price}</p>
            <p className="text-white text-lg">Offer: {item.offer}</p>
          </div>
        </div>
      ))}
    </div>
    <div className='grid grid-cols-2 gap-5 flex-wrap mx-5 items-center sm:hidden'>
      {home_Product_Cards.map((item) => (
        <div className="container " key={item.id} >
          <div className="bg-slate-900 p-1 rounded-lg w-full">
            <img src={item.image} alt="" />
            <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-white text-lg mb-2">Price: ${item.price}</p>
            <p className="text-white text-lg">Offer: {item.offer}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Items;
