import React from 'react'

function Feedback() {
    return (
        <div className="min-w-full p-5">
            <div className="my-10 flex gap-5">
                <input type="emal" placeholder='email' className='email' />
                <input type="mobile" placeholder='contact number' />

            </div>
            <div className="my-10 flex gap-5">
                <input type="text" placeholder='Buisiness type' className='' />

            </div>
        </div>
    )
}

export default Feedback