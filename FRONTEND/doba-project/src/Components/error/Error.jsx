import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Error.css";

function Error(noJobs) {
  // const location = useLocation();
 
  // useEffect(() => {
  //   // Set document title based on conditions
  //   if (noJobs) {
  //     document.title = "DoBa - No Jobs Available"; // Set title if no jobs are available
  //   } else {
  //     document.title = "DoBa 404 Page not found"; // Set title if page not found
  //   } 
  // }, [noJobs, location.pathname]);
  

  return (
    <div id="notfound">
      <div className="notfound space-y-5">
        <div className="notfound-404 my-12">
          <h1>Oops!</h1>
        </div>
        {/* {noJobs ? (
          <h2 className="text-lg font-bold">
            No Jobs are available at the moment.
          </h2>
        ) : ( */}
          <>
            <h2 className="text-lg font-bold">404 - Page not found</h2>
            <button>
              <Link
                to="/"
                className="bg-main p-2 text-slate-100 font-semibold my-6 rounded-2xl"
              >
                Go To Home
              </Link>
            </button>
          </>
        {/* )} */}
      </div>
    </div>
  );
}

export default Error;
