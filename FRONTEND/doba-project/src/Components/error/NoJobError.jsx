import React from 'react'
import { Link } from 'react-router-dom'

function NoJobError() {
  return (
    <div>
        <div id="notfound">
      <div className="notfound space-y-5">
        <div className="notfound-404 my-12">
          <h1>Oops!</h1>
        </div>
          <>
            <h2 className="text-lg font-bold">No jobs are available </h2>
            <button>
              <Link
                to="/"
                className="bg-main p-2 text-slate-100 font-semibold my-6 rounded-2xl"
              >
                Go To Home
              </Link>
            </button>
          </>
      </div>
    </div>
    </div>
  )
}

export default NoJobError