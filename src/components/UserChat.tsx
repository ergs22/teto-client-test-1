import Image from "next/image"
import { BotChatPros } from "@/types/types"

const UserChat = ({ respon }: BotChatPros) => {
    return (<div className="w-[90%] md:w-[85%] lg:w-[75%] flex items-center justify-end my-4">

        <p className="max-w-[70%] text-sm leading-6 mr-4 whitespace-normal rounded-3xl text-left bg-white-4 text-black px-5 py-[0.625rem]">
            {respon}
        </p>
        <div className="bg-[#87CEEB] rounded-full w-10 h-10 flex-shrink-0 overflow-hidden">
            <Image
                src="/images/profile-picture-user-m.png"
                alt="profile-picture"
                width={40}
                height={40}
                className="object-cover w-auto h-auto"
            />
        </div>
    </div>)

}

export default UserChat
