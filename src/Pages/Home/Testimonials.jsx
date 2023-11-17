import { useState } from "react";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Rating, Star } from "@smastrom/react-rating";
import quote from '../../assets/icon/quote.svg'
import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/navigation";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#CD9003",
  inactiveFillColor: "#A1A1A1",
};


const Testimonials = () => {
    const [reviews,setReviews] = useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/reviews")
          .then((res) => res.json())
          .then((data) => setReviews(data));
    },[])


    return (
      <div>
        <SectionHeader
          mini={"---What Our Clients Say---"}
          heading={"TESTIMONIALS"}
        ></SectionHeader>
        <div className="w-4/6 mx-auto text-center">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="flex px-20 space-y-10 pb-20 justify-center flex-col items-center ">
                  <Rating
                    style={{ maxWidth: 180 }}
                    itemStyles={myStyles}
                    value={review.rating}
                  />
                  <img src={quote} alt="" />
                  <p>{review.details}</p>
                  <h3 className="text-2xl uppercase text-[#CD9003]">
                    {review.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
};

export default Testimonials;