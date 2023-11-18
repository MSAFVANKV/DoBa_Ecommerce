import React, { useRef, useState } from 'react';
import contact1 from '../../../assets/images/contact1.png';
import EnquiryForm from '../../Components/UserForm/EnquiryForm';
import Feedback from '../../Components/UserForm/Feedback';

function Contact() {
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleScrollTo = (index) => {
    const itemRef = scrollRef.current.children[index];
    if (itemRef) {
      itemRef.scrollIntoView({ behavior: 'auto' });
      setActiveIndex(index);
      window.scrollTo(0, 0);

    }
  };

  return (
    <div>
      <div className="w-full sm:flex justify-center bg-white ">
        <div className=" sm:w-[80%] sm:grid grid-cols-3 overflow-x-auto border mt-[6rem]">
          <div className="bg-blue-600 flex flex-col items-center  py-10">
            <div className="w-20 h-20 rounded-full flex justify-center items-center bg-white mb-2">
              <img src={contact1} alt="contact img" className="" />
            </div>
            <div className="font-bold font-comforter2 text-white text-[2rem]">
              <span>CONNECT US</span>
            </div>
          </div>
          {/* second col included all form sections start here */}
          <div className="col-span-2">
            <div className="w-[100%] h-[50px] top-0">
              <div className="text-center border-b-2 border-t-2 p-2 border-red-400">
                <span className={`cursor-pointer px-5 ${activeIndex === 0 ? 'font-bold' : ''}`} onClick={() => handleScrollTo(0)}>
                  General Enquiry
                </span>
                <span className={`cursor-pointer ${activeIndex === 1 ? 'font-bold' : ''}`} onClick={() => handleScrollTo(1)}>
                  Customer Feedback
                </span>
              </div>
            </div>
            {/* form starts here */}
            <div className="w-[100%] max-h-[100%] flex overflow-x-hidden scroll-smooth" ref={scrollRef}>
              {/* first form General Enquiry*/}
              <div className="min-w-full" id="enquiry">
                <EnquiryForm />
              </div>
              {/* second form Customer Feedback*/}
              <div className="min-w-full" id="feedback">
                <Feedback />
              </div>
            </div>
            {/* Second form */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
