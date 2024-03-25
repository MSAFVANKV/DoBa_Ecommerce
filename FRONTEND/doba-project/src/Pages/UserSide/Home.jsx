import React, { useEffect } from "react";
import "../../Styles/Home.css";
import { motion } from "framer-motion";

// images
import wave from "../../../assets/images/wave_2.svg";
// import waveTop from "../../../assets/images/wave_white.svg";
import chef from "../../../assets/images/chef-1.png";
import nature from "../../../assets/images/rice-icon.png";

import Sample from "./Sample";
import { useDispatch, useSelector } from "react-redux";
import { getSliderHome } from "../../ReduxToolKit/Admin/SliderSlice";
import { getProductsHome } from "../../ReduxToolKit/Admin/ProductsSlice";
import { mainURL } from "../../Base/Constent";
import { Link } from "react-router-dom";
import Banner from "../../Components/Banner/Banner";
import Welcome from "./Welcome";
import OurProducts from "./OurProducts";

function Home() {
  const dispatch = useDispatch();
  const getProductSlice = useSelector((state) => state.products?.products);
  const getSliderSlice = useSelector((state) => state.slider?.slider);

  useEffect(() => {
    dispatch(getSliderHome()); // Fetch products when the component mounts
    dispatch(getProductsHome());
  }, [dispatch]);
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
    >
      {/* <BannerHome /> */}
      <Banner />
      <Welcome />
      <img src={wave} className="" alt="" />
      <OurProducts />

      <section>

        {/* slider started here */}
        {getSliderSlice && getSliderSlice.length > 0 ? <Sample /> : null}
      </section>
      {/* why us */}
      <div className=" w-[100%] text-center">
        <div className="my-14">
          <span className="sm:text-[2rem] text-[1.5rem] font-bold select-none">
            WHY DoBa
          </span>
        </div>
        <div className="flex justify-center h-[700px] sm:h-[500px] md:h-[300px] lg:h-[250px]">
          <div className="md:grid md:grid-cols-2  w-[80%] h-[250px]  gap-5">
            <div className="bg-[#FFAE79] rounded-xl shadow-xl ">
              <span className="sm:text-[1.6rem] text-[1.2rem]  font-bold select-none">
                QUALITY
              </span>
              <div className="lg:grid lg:grid-cols-3">
                <div className="flex items-center justify-center">
                  <img src={chef} alt="chef" className="lg:h-[70%] h-[80px]" />
                </div>
                <div className="flex capitalize font-extralight sm:text-[1.1rem] items-center text-start p-3  col-span-2">
                  <p>
                    "We make sure that every batch of production undergoes
                    international quality processes without fail. All processes
                    are done by our machines."
                  </p>
                </div>
              </div>
            </div>
            {/* 2nd col */}
            <div className="bg-[#BBD8FF] rounded-xl shadow-xl mt-6 md:mt-0">
              <span className="sm:text-[1.6rem] text-[1.2rem] font-bold uppercase lg:mt-5 select-none">
                NATURE
              </span>
              <div className="lg:grid lg:grid-cols-3">
                <div className="flex items-center justify-center">
                  <img
                    src={nature}
                    alt="chef"
                    className="lg:h-[70%] h-[80px]"
                  />
                </div>
                <div className="flex lg:mt-8 capitalize font-extralight sm:text-[1.1rem] items-center text-start p-3  col-span-2">
                  <p>
                    We believe in the power of natural ingredients..You won't
                    find any artificial additives or preservatives in our
                    products. Zero Chemicals, Zero Compromises"
                  </p>
                </div>
              </div>
            </div>
            {/* end */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
