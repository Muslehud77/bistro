import useMenu from "../../Hooks/useMenu";
import Cover from "../../Shared/Cover/Cover";
import HelmetProvider from "../../Shared/Helmet/Helmet";
import menu from '../../assets/menu/banner3.jpg'
import dessertBg from '../../assets/menu/dessert-bg.jpeg'
import soupBg from '../../assets/menu/soup-bg.jpg'
import saladBg from '../../assets/menu/salad-bg.jpg'
import pizzaBg from '../../assets/menu/pizza-bg.jpg'
import SectionHeader from './../../Shared/SectionHeader/SectionHeader';
import MenuCategory from "./MenuCategory";


const Menu = () => {
    const [items, loading] = useMenu();
    const offered = items.filter((item) => item.category === "offered");
    const pizza = items.filter((item) => item.category === "pizza");
    const dessert = items.filter((item) => item.category === "dessert");
    const salad = items.filter((item) => item.category === "salad");
    const soup = items.filter((item) => item.category === "soup");
   
    
  
  return (
    <div>
      <HelmetProvider title={"Menu"}></HelmetProvider>
      <Cover title={"our menu"} img={menu}></Cover>
      <SectionHeader
        mini={"---Don't Miss---"}
        heading={"TODAY'S OFFER"}
      ></SectionHeader>

      <MenuCategory items={offered}></MenuCategory>

      <MenuCategory
        title={"Pizza"}
        img={pizzaBg}
        items={pizza}
      ></MenuCategory>

      <MenuCategory
        title={"Dessert"}
        img={dessertBg}
        items={dessert}
      ></MenuCategory>

      <MenuCategory title={"Salad"} img={saladBg} items={salad}></MenuCategory>

      <MenuCategory title={"Soup"} img={soupBg} items={soup}></MenuCategory>
    </div>
  );
};

export default Menu;
 