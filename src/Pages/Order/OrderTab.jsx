import { TabPanel } from "react-tabs";
import ItemCard from "../Menu/ItemCard";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



// import required modules
import { Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

const OrderTab = ({items}) => {
     
  
    const itemsPerPage = 6;
    const pages = Math.ceil(items.length / itemsPerPage);
    const paginations = [...Array(pages).keys()].map(p=>p+1)
     

   



const pagination = {
  clickable: true,

  renderBullet: function (index, className) {
    
    return `<div onclick="()=>console.log('hello')" class='relative  ${className}'> <p class='absolute text-white top-[20%] right-[35%] '>${
      index + 1
    }</p></div>`;
  },
  
};

const [activeIndex, setActiveIndex] = useState(1);
const swiperRef = useRef(null);

useEffect(() => {
  if (swiperRef.current !== null) {
    const swiperInstance = swiperRef.current.swiper;

    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        setActiveIndex(swiperInstance.activeIndex+1);
      });
    }
  }
}, []);


 const sliced = items.slice((activeIndex-1)*itemsPerPage,activeIndex*itemsPerPage);
 


    return (
      <>
        <>
          <Swiper
            ref={swiperRef}
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper orderTab"
          >
            {paginations.map((p, i) => (
              <SwiperSlide key={i}>
                <div className="grid md:grid-cols-3 gap-5 w-9/12 mx-auto mt-5">
                  {" "}
                  {sliced.map((item) => (
                    <ItemCard key={item._id} item={item}></ItemCard>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </>
    );
};

export default OrderTab;