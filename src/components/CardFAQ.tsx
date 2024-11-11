"use client";

import { CardFAQProps } from "@/types/types";
import Image from "next/image";
import { useState, useRef } from "react";

// interface CardFAQExtendedProps extends CardFAQProps {
//     delay: number; // Agregamos esta propiedad
// }

const CardFAQ = ({ name, info }: CardFAQProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleClic = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className="border border-gray-2 md:w-[90%] lg:w-[65%] overflow-hidden mb-8 rounded-lg-exten bg-white-3 p-6 flex justify-between items-start"
        >
            <div className="w-[90%]">
                <h3 className="font-semibold py-2">{name}</h3>
                <div
                    ref={contentRef}
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0' }}
                >
                    <p>{info}</p>
                </div>
            </div>
            <span className="w-[32px] h-[32px] flex-shrink-0" onClick={handleClic}>
                <Image
                    className={`cursor-pointer transition-transform duration-500 ease-in-out transform ${isOpen ? 'rotate-45' : '-rotate-30'}`}
                    src="/icons/show.png"
                    alt="show"
                    height={100}
                    width={100}
                    quality={100}
                />
            </span>
        </div>
    );
};

export default CardFAQ;
