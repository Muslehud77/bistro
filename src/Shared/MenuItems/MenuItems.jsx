

const MenuItems = ({menu}) => {

    const {name,image,price,recipe} = menu

    return (
      <div className="flex justify-center items-center">
        <div className="flex gap-4 text-[#151515]">
          <div className="w-[118px] h-[104px]">
            <img
              className="w-[118px] object-cover h-[104px]  rounded-tl-none rounded-[200px]"
              src={image}
            ></img>
          </div>
          <div>
            <p className="text-lg uppercase">{name} ----------</p>
            <p className="w-[300px] md:w-[500px]">{recipe}</p>
          </div>
          <p className="text-[#BB8506]">${price}</p>
        </div>
      </div>
    );
};

export default MenuItems;