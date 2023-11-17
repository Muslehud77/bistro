import img from '../../assets/home/chef-service.jpg'

const ChefService = () => {
    return (
      <div className="my-10 flex flex-col justify-center items-center relative">
        <img src={img} className="h-[70vh] w-full object-cover blur-sm" alt="" />
        <div className="text-center flex justify-center absolute bg-white w-5/6 py-20 shadow-xl">
          <div className='w-3/6'>
            <h1 className='text-4xl mb-2'>BISTRO BOSS</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, libero accusamus laborum deserunt ratione dolor
              officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
              nihil iusto ducimus incidunt quibusdam nemo.
            </p>
          </div>
        </div>
      </div>
    );
};

export default ChefService;