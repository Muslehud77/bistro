import React from 'react';

const SectionHeader = ({mini,heading}) => {
    return (
      <div className="flex justify-center items-center text-center mt-16 my-10">
        <div className=" flex flex-col gap-3">
          <p className="text-[#D99904] text-lg italic">
            {mini}
          </p>
          <div className="bg-[#E8E8E8] h-1"></div>
          <h2 className="text-4xl">{heading}</h2>
          <div className="bg-[#E8E8E8] h-1"></div>
        </div>
      </div>
    );
};

export default SectionHeader;