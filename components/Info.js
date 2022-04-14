import React from "react";
import Image from "next/image";

  return (
    <div>
      <div className="text-white h-1/2 w-full flex flex-col justify-around md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl  mx-auto p-7 border-b-2 border-t-2 mt-16">
        <div className="relative h-96 w-96 rounded-md mt-6">
          <Image
            src={
              "https://cdn.shopify.com/s/files/1/0572/6450/4891/products/H2f834c35a70e4ec094f7a80bf69925a4m.jpg?v=1649835294"
            }
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="main text-left justify-center align-middle flex flex-col ">
          <h1 className="text-center font-extrabold text-xl mb-3">
            How do I use it?
          </h1>
          <p className="text-lg dd">
            Simply fill the E-Flame with water, add your favorite essential
            oils, plug it in and turn on! It's as easy as that.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
