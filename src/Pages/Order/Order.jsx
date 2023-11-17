import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cover from "../../Shared/Cover/Cover";
import order from "../../assets/shop/banner2.jpg";
import useMenu from "../../Hooks/useMenu";

import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HelmetProvider from "../../Shared/Helmet/Helmet";

const Order = () => {
  const categories = ['All','Salad','Pizza',"Soup",'Dessert','Drinks']
  const {category} = useParams()
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);

  useEffect(() => {
   
      window.scrollTo({ top: 0, behavior: "smooth" });

  },[])
 
    const [items] = useMenu();
    const drinks = items.filter((item) => item.category === "drinks");
    const pizza = items.filter((item) => item.category === "pizza");
    const dessert = items.filter((item) => item.category === "dessert");
    const salad = items.filter((item) => item.category === "salad");
    const soup = items.filter((item) => item.category === "soup");




  return (
    <div>
      <HelmetProvider title={"Order"}></HelmetProvider>
      <Cover img={order} title={"order"}></Cover>
      <Tabs
        defaultIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        className="my-10"
      >
        <TabList>
          <Tab>
            All
          </Tab>
          <Tab>
            Salad
          </Tab>
          <Tab>
            Pizza
          </Tab>
          <Tab>
            Soup
          </Tab>
          <Tab>
            Dessert
          </Tab>
          <Tab>
            Drinks
          </Tab>
        </TabList>

        <TabPanel>
          <OrderTab items={items}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
