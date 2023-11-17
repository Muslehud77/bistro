
import MenuItems from '../MenuItems/MenuItems';

const MenuCategory = ({ items }) => {
console.log(items);
  return (
    <div className="flex flex-col justify-center items-center gap-5 my-10">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((menu) => (
          <MenuItems key={menu._id} menu={menu}></MenuItems>
        ))}
      </div>
      <button className="btn bg-white  border-b-2 border-b-black outline-none">
        View full menu
      </button>
    </div>
  );
};

export default MenuCategory;