import HelmetProvider from "../../Shared/Helmet/Helmet";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import Banner from "./Banner";
import Call from "./Call";
import Category from "./Category";
import ChefService from "./ChefService";
import Featured from "./Featured";
import MenuSpecial from "./MenuSpecial";
import Testimonials from "./Testimonials";



const Home = () => {
    return (
      <div>
       <HelmetProvider title={'Home'}></HelmetProvider>
        <Banner></Banner>
        <SectionHeader
          mini={"---From 11:00am to 10:00pm---"}
          heading={"ORDER ONLINE"}
        ></SectionHeader>
        <Category></Category>
        <ChefService></ChefService>
        <SectionHeader
          mini={"---Check it out---"}
          heading={"FROM OUR MENU"}
        ></SectionHeader>
        <MenuSpecial ></MenuSpecial>
        <Call></Call>
        <Featured></Featured>
        <Testimonials></Testimonials>
      </div>
    )
};

export default Home;