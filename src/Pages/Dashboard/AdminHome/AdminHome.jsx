import { useEffect } from "react";
import useContextInfo from "../../../Hooks/useContextInfo";
import useStats from './../../../Hooks/useStats';
import { FaTruck, FaUser, FaWallet } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
 
  ResponsiveContainer,
  Legend,
} from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const AdminHome = () => {
   const { user } = useContextInfo();
   const {stats,itemsSold} = useStats()

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

 
  const pieChartData = itemsSold.map(item=>{
    return {name: item._id,value:item.revenue}
  })





  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

   return (
     <div className="mt-10">
       <h2 className="text-3xl">
         Hi, Welcome {user?.displayName ? user.displayName : "Back"}!
       </h2>

       <div className="w-full">
         <div className="stats shadow w-full">
           <div className="stat">
             <div className="stat-figure text-secondary">
               <FaWallet size={30} />
             </div>
             <div className="stat-title">Revenue</div>
             <div className="stat-value" data-value={stats.revenue}>
               ${stats.revenue}
             </div>
             <div className="stat-desc">Jan 1st - Feb 1st</div>
           </div>

           <div className="stat">
             <div className="stat-figure text-secondary">
               <FaUser size={30} />
             </div>
             <div className="stat-title">Customers</div>
             <div className="stat-value" data-value={stats.users}>
               {stats.users}
             </div>
             <div className="stat-desc">↗︎ 400 (22%)</div>
           </div>

           <div className="stat">
             <div className="stat-figure text-secondary">
               <MdOutlineRestaurantMenu size={30} />
             </div>
             <div className="stat-title">Items</div>
             <div className="stat-value" data-value={stats.menuItems}>
               {stats.menuItems}
             </div>
             <div className="stat-desc">↘︎ 90 (14%)</div>
           </div>
           <div className="stat">
             <div className="stat-figure text-secondary">
               <FaTruck size={30} />
             </div>
             <div className="stat-title">Orders</div>
             <div className="stat-value" data-value={stats.orders}>
               {stats.orders}
             </div>
             <div className="stat-desc">↘︎ 90 (14%)</div>
           </div>
         </div>
       </div>
       <div className="md:flex">
         <div className="w-1/2">
           <BarChart
             width={500}
             height={300}
             data={itemsSold}
             margin={{
               top: 20,
               right: 30,
               left: 20,
               bottom: 5,
             }}
           >
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="_id" />
             <YAxis />
             <Bar
               dataKey="quantity"
               fill="#8884d8"
               shape={<TriangleBar />}
               label={{ position: "top" }}
             >
               {itemsSold.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={colors[index % 20]} />
               ))}
             </Bar>
           </BarChart>
         </div>
         <div className="w-1/2">
           <ResponsiveContainer>
             <PieChart width={400} height={400}>
               <Pie
                 data={pieChartData}
                 cx="50%"
                 cy="50%"
                 labelLine={false}
                 label={renderCustomizedLabel}
                 outerRadius={80}
                 fill="#8884d8"
                 dataKey="value"
               >
                 {pieChartData.map((entry, index) => (
                   <Cell
                     key={`cell-${index}`}
                     fill={colors[index % colors.length]}
                   />
                 ))}
               </Pie>
               <Legend></Legend>
             </PieChart>
           </ResponsiveContainer>
         </div>
       </div>
     </div>
   );
};

export default AdminHome;