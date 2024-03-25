import React, { useEffect } from 'react'
import "./Error.css"
function Error() {
    useEffect(() => {
        document.title = "404 - Page Not Found";
    },[document])
  return (
    <div id="notfound" >
<div class="notfound space-y-5">
<div class="notfound-404 mb-10">
<h1>Oops!</h1>
</div>
<h2 className='text-lg font-bold'>404 - Page not found</h2>
{/* <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p> */}
<button>
<a href="/" className='bg-main p-2 text-slate-100 font-semibold my-6 rounded-2xl'>Go To Homepage</a>
</button>
</div>
</div>
  )
}

export default Error

