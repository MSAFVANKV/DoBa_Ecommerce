import React, { useState } from 'react'
import { words } from './words';

import {CiSearch} from 'react-icons/ci'

function SearchBar() {
    const [activeSearch, setActiveSearch] = useState([]);

    const handleSearch = (e) => {
        if(e.target.value == ''){
            setActiveSearch([])
            return false
        }
        setActiveSearch(words.filter(w => w.includes(e.target.value)).slice(0, 8))
    }
  return (
    <div>
        <form action="" className=' relative'>
            <div className="relative">
                <input type="search" placeholder='type here' className='w-full p-4 rounded-full bg-white'
                onChange={(e)=> handleSearch(e)}/>
            </div>
            <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-[#F26D1E] rounded-full text-white
            font-extrabold'><CiSearch/></button>
            {
                activeSearch.length > 0 && (
                    <div className="absolute top-16 p-2 bg-white text-black w-full
                    rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 cursor-pointer shadow-xl">
                        {
                            activeSearch.map(s => (
                                <div className="w-full hover:bg-slate-200 rounded-xl p-2 ">
                                    {s}
                                </div>
                                
                            ))
                        }
                    </div>
                )
            }
        </form>
    </div>
  )
}

export default SearchBar