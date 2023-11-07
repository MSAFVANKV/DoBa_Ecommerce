import React from 'react';

function Dashboard({ setIsAdminLoggedIn }) {
  return (
    <div className='container bg-slate-400 mx-auto'>
      <div className='page-container justify-center'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-[25%] lg:grid-cols-4 text-center rounded-xl m-10 gap-10">
          <div className="bg-slate-100 col-span-1 p-6 w-[200px] rounded-xl">Column 1</div>
          <div className="bg-slate-100 col-span-1 p-6 w-[200px] rounded-xl">Column 2</div>
          <div className="bg-slate-100 col-span-1 p-6 w-[200px] rounded-xl">Column 3</div>
          <div className="bg-slate-100 col-span-1 p-6 w-[200px] rounded-xl">Column 4</div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
