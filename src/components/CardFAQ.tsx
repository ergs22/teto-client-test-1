"use client"

import { CardFAQProps } from "@/types/types"
import Image from "next/image"
import { useState } from "react";

const CardFAQ = ({ name, info }: CardFAQProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-2 w-[60vw] overflow-hidden mb-8 rounded-lg-exten bg-white-3 p-6 flex justify-between items-center">
            <div className="w-[90%]">
                <h3 className=" font-semibold py-2">{name}</h3>
                <p className={`transition-transform duration-500 ease-in-out transform ${isOpen ? 'block' : 'hidden'} `}> {info} </p>
            </div>
            <span className="w-[32px] h-[32px]" onClick={handleClick}>
                <Image className={`cursor-pointer transition-transform duration-500 ease-in-out transform ${isOpen ? 'rotate-45' : '-rotate-30'}`} src="/icons/show.png" alt="show" height={100} width={100} quality={100} />
            </span>
        </div>
    )
}

export default CardFAQ