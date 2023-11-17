import { Parallax } from "react-parallax";

const Cover = ({ img, title }) => {
  return (
    <div>
      <Parallax
        blur={5}
        bgImage={img}
        bgImageAlt="the cat"
        strength={300}
      >
        <div className="hero min-h-[80vh]">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content w-full text-center text-neutral-content">
            <div className="w-3/5 mt-10 bg-black bg-opacity-50 py-20 ">
              <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
              <p className="mb-5 uppercase">Would you like to try a dish?</p>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Cover;
