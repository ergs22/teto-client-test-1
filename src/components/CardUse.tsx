import { CardUseProps } from "@/types/types";
import Image from "next/image";

const CardUse = ({ title, parraf, img }: CardUseProps) => {
    return (
        <div className="md:w-[40vw] lg:w-[27.5vw] md:h-[25vh] lg:h-[15rem] xl:h-[25vh] overflow-hidden rounded-lg-exten bg-white-3 p-6 flex justify-between md:items-start items-center">
            <div className="w-[30px] h-[30px]">
                <Image quality={100} src={img} height={100} width={100} alt={title} />
            </div>
            <div className="w-[75%]">
                <h1 className="text-xl font-medium">{title}</h1>
                <p className="mt-4">{parraf}</p>
            </div>
        </div>
    );
};

export default CardUse;
