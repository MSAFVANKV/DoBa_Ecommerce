import React from "react";
import { mainURL } from "../../Base/Constent";

function Sliders({ banner }) {
  return (
    <div className="relative w-[100%] overflow-hidden">
      <img
        src={`${mainURL}/Public/Banner/${banner.file}`}
        alt=""
        className="w-full h-auto  md:h-96"
        style={{ maxHeight: "30vw", objectFit: "" }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 text-center">
        <p className="text-4xl lg:text-6xl font-bold capitalize" style={{ color: banner.color }}>{banner.bannerName}</p>
        <p className="text-2xl lg:text-4xl font-bold capitalize" style={{ color: banner.color }}>{banner.subtitle}</p>
      </div>
    </div>
  );
}

export default Sliders;
