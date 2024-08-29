import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"
import { useEffect, useState } from "react"

const SidebarChat = () => {

    const [data, setData] = useState({
        _id: "",
        username: "",
        fullname: "",
        age: "",
    });

    const router = useRouter();

    useEffect(() => {
        getUserDetails()
    }, [])


    const getUserDetails = async () => {
        const res = await axios.get('/api/users/userdata')
        setData((prevData) => res.data.data);

    }
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout successfull")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (<div className="h-screen md:flex flex-col justify-between items-end z-50 hidden bg-[#B8ECD1] w-[45vw] md:w-[40vw] lg:w-[25vw] ">
        <div className=" flex items-center justify-end w-full pr-6 mt-6 ">
            <p className=" text-green-3 mr-2 max-[50%]">{data === undefined ? "User" : data?.username}</p>
            <div className=" bg-[#87CEEB] rounded-full overflow-hidden">
                <Image src="/images/profile-picture-user-m.png" alt="profile-picture" width={40} height={40} />
            </div>
        </div>
        <div className="flex items-center justify-start w-full pl-6 mb-6 ">
            <div onClick={logout} className="cursor-pointer">
                <Image src="/icons/logout.png" alt="logout" width={30} height={30} />
            </div>
            <p onClick={logout} className="ml-2 cursor-pointer text-green-3">Salir</p>
        </div>
    </div>)
}

export default SidebarChat;