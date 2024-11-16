import Image from "next/image"
import { BotChatPros } from "@/types/types"

const BotChat = ({ respon }: BotChatPros) => {

    return (<div className="w-[90%] md:w-[85%] lg:w-[75%] flex justify-start my-4">
        <div> <Image src="/images/profile-picture-bot.png" alt="profile-picture" width={40} height={40} /> </div>
        <p className="max-w-[70%] text-sm leading-6 ml-4 whitespace-normal rounded-3xl text-left text-white bg-green-3 px-5 py-[0.625rem]">
            {respon}
        </p>
    </div>)
}

export default BotChat