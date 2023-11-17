
import MenuItems from '../../Shared/MenuItems/MenuItems';
import useMenu from '../../Hooks/useMenu';
import MenuCategory from '../../Shared/MenuCategory/MenuCategory';


const MenuSpecial = () => {
    const [items,loading] = useMenu('popular')
    const popular = items.filter(item => item.category === 'popular')
    return (
      <>
        {loading ? (
          <div className="flex justify-center items-center h-56">
            <progress className="progress w-56"></progress>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5 my-10">
            <div className="grid md:grid-cols-2 gap-4">
              {popular.map((menu) => (
                <MenuItems key={menu._id} menu={menu}></MenuItems>
              ))}
            </div>
            <button className="btn bg-white  border-b-2 border-b-black outline-none">
              View full menu
            </button>
          </div>
        )}
      </>
    );
};

export default MenuSpecial;