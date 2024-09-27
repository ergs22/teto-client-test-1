import { CardExpProps } from "@/types/types"
import Image from "next/image"

const CardExp = ({ name, country, parraf, img }: CardExpProps) => {
    return (
        <div className="sm:w-[40vw] md:w-[27.5vw] border border-gray-2 overflow-hidden mb-8 rounded-lg-exten bg-white-3 p-8 flex flex-col justify-center">
            <p>{parraf}</p>
            <div className=" flex mt-6">
                <div className=" mr-4 rounded-full">
                    <Image width={100} height={100} quality={100} alt="profile-picture" className=" rounded-full w-[48px] h-[48px] object-cover" src={img} />
                </div>
                <div>
                    <h3 className=" font-semibold">{name}</h3>
                    <p> {country} </p>
                </div>

            </div>
        </div>
    )
}

export default CardExp