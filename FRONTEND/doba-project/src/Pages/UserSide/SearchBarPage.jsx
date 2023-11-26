import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mainURL, userURL } from '../../Base/Constent';
import axios from 'axios';

function SearchBarPage() {
  const { query } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get(`${userURL}/product/${query}`)
      .then((response) => setResults(response.data))
      .catch((error) => console.error(error));
  }, [query]);

  if (!results) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className=''>
      <div className="flex justify-center p-10 gap-5">
        <h1 className='text-[1.3rem] font-bold'>Looking For: <span>{results.productName}</span></h1>
      </div>
      <div className="flex justify-center items-center grid-cols-2">
      <div className="h-[220px] w-[200px] md:h-[215px] md:w-[215px] lg:h-[250px] lg:w-[250px]  my-4 border rounded-md overflow-hidden shadow-md">
            <img
              src={`${mainURL}/Public/ProductsImages/${results.file[0]}`}
              alt={results.productName}
              className='w-full lg:h-[190px] h-[150px] p-1 sm:object-cover sm:object-center'
            />
            <div className="p-2">
              <p className="text-center font-bold text-sm mb-1">{results.productName}</p>
              {/* Add other details as needed */}
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-xs ">{/* Add other details, e.g., price, category, etc. */}</p>
                <Link to={`/product/${results._id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                  Details
                </Link>
              </div>
            </div>
          </div>
      </div>
     
    </div>
  );
}

export default SearchBarPage;
