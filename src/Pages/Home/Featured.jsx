import SectionHeader from '../../Shared/SectionHeader/SectionHeader';
import img from '../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
      <div className='featured bg-fixed'>
        <div className="relative text-white my-10  flex justify-center items-center">
          <div className="py-20 bg-black bg-opacity-40">
            <SectionHeader
              mini={"---Check it out---"}
              heading={"FROM OUR MENU"}
            ></SectionHeader>
            <div className="flex justify-center items-center gap-10">
              <img className="w-3/12" src={img} alt="" />
              <div className="space-y-2">
                <h4 className="text-2xl">
                  March 20, 2023 <br />
                  WHERE CAN I GET SOME?
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error{" "}
                  <br />
                  voluptate facere, deserunt dolores maiores quod nobis quas{" "}
                  <br />
                  quasi. Eaque repellat recusandae ad laudantium tempore <br />
                  consequatur consequuntur omnis ullam maxime tenetur.
                </p>
                <button className="btn bg-transparent border-t-0 border-x-0 hover:bg-transparent outline-none border-b-2 border-b-white text-white">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Featured;