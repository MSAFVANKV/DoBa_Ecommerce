import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { mainURL, userURL } from "../../Base/Constent";
import axios from "axios";
import { setBanner } from "../../ReduxToolKit/Admin/bannerSlice";
import Sliders from "./Sliders";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Banner() {
  const dispatch = useDispatch();
  const slider = React.useRef(null);
  const getBannerSlice = useSelector((state) => state.banner.banner);

  useEffect(() => {
    axios
      .get(`${userURL}/get/allbanner`, { withCredentials: true })
      .then((response) => {
        dispatch(setBanner(response.data));
      });
  }, [dispatch]);

  var settings = {
    infinite: getBannerSlice && getBannerSlice.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: getBannerSlice && getBannerSlice.length > 1,
    autoplaySpeed: 5000,
    // nextArrow: <simpleNextArrow/>,
    // prevArrow: <simplePrevArrow/>,
  };

  return (
    <div className="relative w-full overflow-hidden">
      {getBannerSlice && getBannerSlice.length > 1 && (
        <div className="absolute right-2 bottom-2 z-10">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="btn p-2 rounded-full ml-5"
          >
            <FaAngleLeft className="w-8 h-8 p-1" />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="btn p-2 rounded-full ml-5 bg-main"
          >
            <FaAngleRight className="w-8 h-8 p-1" />
          </button>
        </div>
      )}
      <Slider ref={slider} {...settings}>
        {getBannerSlice &&
          getBannerSlice.map((banner, i) => (
            <Sliders banner={banner} key={i} className="overflow-hidden " />
          ))}
      </Slider>
    </div>
  );
}

export default Banner;
