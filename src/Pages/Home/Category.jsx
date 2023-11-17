import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import cat1 from '../../assets/home/slide1.jpg'
import cat2 from '../../assets/home/slide2.jpg'
import cat3 from '../../assets/home/slide3.jpg'
import cat4 from '../../assets/home/slide4.jpg'
import cat5 from '../../assets/home/slide5.jpg'


const Category = () => {
  return (
    <div className="mb-10">
     
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative flex flex-col justify-center items-center">
            <img src={cat1} alt="" />
            <h1 className="text-xl md:text-2xl lg:text-4xl  absolute text-white shadow-xl bottom-8">SALADS</h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex flex-col justify-center items-center">
            <img src={cat2} alt="" />
            <h1 className="text-xl md:text-2xl lg:text-4xl  absolute text-white shadow-xl bottom-8">SOUPS</h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex flex-col justify-center items-center">
            <img src={cat3} alt="" />
            <h1 className="text-xl md:text-2xl lg:text-4xl  absolute text-white shadow-xl bottom-8">PIZZAS</h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex flex-col justify-center items-center">
            <img src={cat4} alt="" />
            <h1 className="text-xl md:text-2xl lg:text-4xl  absolute text-white shadow-xl bottom-8">DESSERTS</h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex flex-col justify-center items-center">
            <img src={cat5} alt="" />
            <h1 className="text-xl md:text-2xl lg:text-4xl  absolute text-white shadow-xl bottom-8">SALADS</h1>
          </div>
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default Category;
