import React from 'react'
import Items from './Items'

import poster from '../../../assets/images/DoBa_produts_poster_01.jpg'
import texture_1 from '../../../assets/images/texture-1.jpg'
import texture_2 from '../../../assets/images/texture-2.jpg'



function Products() {
  return (
    <div className=''>
      {/*  */}
      <div className="w-[100%] h-[70vh] md:flex">
        <div className="lg:w-[50%] w-[100%] h-[100%] bg-slate-200 rounded-e-xl relative flex justify-center items-center">
          <span className='sm:w-[250px] w-[150px]  font-comforter sm:text-[2rem]'>"Is your day starting with a fresh start? Your day will be grateful."</span>
          <div className="bg-slate-400 h-[100%] w-[1rem] hidden md:block absolute right-0 rounded-e-2xl"></div>
          <div className="bg-slate-400 h-[1rem] w-[100%] md:hidden block absolute bottom-0 rounded-b-2xl"></div>
          <div className="md:hidden block w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] gap-4 bg- bg-contain rounded-full" style={{backgroundImage:`url(${poster})`}}></div>

        </div>
        <div className="lg:w-[50%] w-[100%] hidden md:flex justify-center items-center bg-cover bg-center bg-no-repeat" >
           {/* rounded image start */}
        <div className="lg:w-[350px] md:w-[270px] md:flex justify-center items-center lg:h-[350px] md:h-[270px] rounded-image bg- bg-contain rounded-full" style={{backgroundImage:`url(${texture_2})`}}>
        <div className="lg:w-[300px] md:w-[250px] lg:h-[300px] md:h-[250px] bg- bg-contain rounded-full shadow-2xl" style={{backgroundImage:`url(${poster})`}}></div>

        </div>
              {/* rounded image ends */}

        </div>
      </div>
      {/*  */}
      <div className="mt-[8rem] ">
          <Items/>
          
      </div>
    </div>
  )
}

export default Products