import React from 'react'

import waveWhite from '../../../assets/images/wave_white.svg'
import logo from '../../../assets/images/doba_logo.png'

function Footer() {
  return (
    <div>
      <div className="sticky bottom-0 w-full h-[90vh] bg-[#F26D1E]">
        <img src={waveWhite} alt="" />
        <div className="logo p-1 ms-9">
          <img src={logo} alt="" />
        </div>

      </div>
    </div>
  )
}

export default Footer