import React from 'react';

const ButtonSc = ({children}) => {
    return (
        <button className="cursor-pointer rounded-full text-sm md:text-base font-bold p-1 hover:bg-gray-400/20 duration-200">{children}</button>
    );
};

export default ButtonSc;