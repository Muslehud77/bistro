
import { Link } from 'react-router-dom';
import MenuItems from '../../Shared/MenuItems/MenuItems';
import Cover from '../../Shared/Cover/Cover';

const MenuCategory = ({items,title,img}) => {
    return (
      <div>
        {title && <Cover title={title} img={img}></Cover>}
        <div className="flex flex-col justify-center items-center gap-5 my-10">
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((menu) => (
              <MenuItems key={menu._id} menu={menu}></MenuItems>
            ))}
          </div>
          <Link to={`/order${title? '/'+title : '/'+'All'}`}>
            <button className="btn bg-white  border-b-2 border-b-black outline-none">
              Order your favorite food
            </button>
          </Link>
        </div>
      </div>
    );
};

export default MenuCategory;